const sqlite3 = require("sqlite3").verbose();
const getArticles = (query, from, to) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database("./news_db", err => {
            if (err) {
                reject(err);
            }
        });

        db.all(
            `SELECT title, author, source_name, published_at, url, source_id, source_name
       FROM articles
       WHERE query = ?
       AND from_date = ?
       AND to_date = ?`,
            [query, from, to],
            (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    const articles = rows.map(row => {
                        return {
                            title: row.title,
                            author: row.author,
                            source: {
                                Id: row.source_id,
                                Name: row.source_name
                            },
                            publishedAt: row.published_at,
                            url: row.url
                        };
                    });

                    if (articles.length > 0) {
                        const result = {
                            status: "ok",
                            totalResults: articles.length,
                            articles: articles
                        };
                        resolve(result);
                    } else {
                        resolve({});
                    }
                }
                db.close();
            }
        );
    });
};

module.exports = {
    getArticles: getArticles
};

