const sqlite3 = require('sqlite3').verbose();



function addArticleToDB(article, query, from, to) {
    const db = new sqlite3.Database('news_db');
    const { title, author, source, publishedAt, url } = article;
    const sourceId = source.Id;
    const sourceName = source.Name;
    const timestamp = new Date().toISOString();

    const sql = `
    INSERT INTO articles (title, author, source_id, source_name, published_at, url, query, from_date, to_date, time_stamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    

    db.run(sql, [title, author, sourceId, sourceName, publishedAt, url, query, from, to, timestamp], function(err) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

module.exports = {
    addArticleToDB: addArticleToDB
};

