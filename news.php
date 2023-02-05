<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>News API Results</title>
    <style>
        .news-container {
            width: 80%;
            margin: 0 auto;
        }

        .news-item {
            border: 1px solid #ccc;
            margin-bottom: 10px;
            padding: 10px;
        }

        .news-title {
            font-size: 1.2em;
            font-weight: bold;
        }

        .news-author {
            font-size: 0.9em;
            color: #555;
        }

        .news-source {
            font-size: 0.9em;
            font-style: italic;
        }

        .news-published-at {
            font-size: 0.9em;
            color: #aaa;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
<div class="news-container">
    <h2>News Results</h2>
    <div id="news-items"></div>
</div>

<script>
    const query = "bob";
    const from = "2023-02-04";
    const to = "2023-02-05";
    const sortBy = "popularity";
    $.ajax({
        type: "POST",
        url: "http://localhost:3000",
        data: {
            query: query,
            from: from,
            to: to,
            sortBy: sortBy
        },
        success: function(data) {
            console.log(data);
            display_news(data.articles);
        },
        error: function(
            error) {
            console.error("An error occurred while making the AJAX request:", error);
        }
    });


    function display_news(articles) {
        // console.log(articles);
        const newsContainer = document.getElementById("news-items");

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            // console.log(article);
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item", "card", "mb-3");

            const newsBody = document.createElement("div");
            newsBody.classList.add("card-body");

            //title
            const title = document.createElement("h5");
            title.classList.add("card-title");
            title.textContent = article['title'];
            newsBody.appendChild(title);

            //author
            if (article['author']) {
                const author = document.createElement("p");
                author.classList.add("card-text");
                author.textContent = article['author'];
                newsBody.appendChild(author);
            }

            if (article['source']) {
                if (article['source']['Name']) {
                    console.log(article['source']['Name']);
                    const name = document.createElement("p");
                    name.classList.add("card-text");
                    name.textContent = article['source']['Name'];
                    newsBody.appendChild(name);
                }
                if (article['source']['Id']) {
                    console.log(article['source']['Id']);
                    const id = document.createElement("p");
                    id.classList.add("card-text");
                    id.textContent = article['source']['Id'];
                    newsBody.appendChild(id);
                }
            }

            if (article['url']) {
                const url = document.createElement("a");
                url.classList.add("card-text");
                url.textContent = article['url'];
                url.href = article['url'];
                newsBody.appendChild(url);
            }
            
            if (article['publishedAt']) {
                const publishedAt = document.createElement("p");
                publishedAt.classList.add("card-text");
                publishedAt.textContent = article['publishedAt'];
                newsBody.appendChild(publishedAt);
            }

            newsItem.appendChild(newsBody);
            newsContainer.appendChild(newsItem);
        }
    }
    
</script>
</body>
</html>
