


function display_news(articles) {
    const newsContainer = document.getElementById("news-items");
    newsContainer.innerHTML = "";
    newsContainer.classList.add("news-items", "d-flex", "flex-wrap", "justify-content-center");

    function addElement(parent, tag, classes, content) {
        const element = document.createElement(tag);
        element.classList.add(...classes);
        element.textContent = content;
        parent.appendChild(element);
        return element;
    }

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];

        const newsItem = addElement(newsContainer, "div", ["news-item", "card", "m-1", "p-1", "col-12", "col-sm-12", "col-md-8", "col-lg-3"], "");

        const newsBody = addElement(newsItem, "div", ["card-body", "news-body"], "");

        const title = addElement(newsBody, "h5", ["card-title", "news-title"], `Title: ${article.title}`);
        title.setAttribute("id", "title");

        if (article.author) {
            const author = addElement(newsBody, "p", ["card-text", "news-author", "font-italic"], `Author: ${article.author}`);
            author.setAttribute("id", "author");
        }

        if (article.source) {
            const source = addElement(newsBody, "div", ["card-body", "news-source"], "");
            if (article.source.Name) {
                addElement(source, "p", ["card-text", "news-name"], `Name: ${article.source.Name}`);
            }
            if (article.source.Id) {
                addElement(source, "p", ["card-text", "news-id"], `ID: ${article.source.Id}`);
            }
        }

        if (article.url) {
            const url = addElement(newsBody, "a", ["card-text", "news-url"], convertUrlToName(article.url));
            url.setAttribute("href", article.url);
        }

        if (article.publishedAt) {
            const publishedAt = addElement(newsItem, "p", ["card-text", "news-published-at", "d-flex", "flex-wrap", "justify-content-end"], `Published At: ${article.publishedAt}`);
            publishedAt.setAttribute("id", "publishedAt");
        }
    }
}

function convertUrlToName(url) {
    // Removes the protocol (e.g. "http://" or "https://")
    url = url.replace(/(^\w+:|^)\/\//, '');
    // Removes the www.
    url = url.replace(/^www\./, '');
    // Removes everything after the first slash
    url = url.split('/')[0];
    // Replaces dashes with spaces
    url = url.replace(/-/g, ' ');
    // Capitalizes first letter of each word
    url = url.replace(/\b\w/g, function(l) { return l.toUpperCase() });    
    return url;
}
$( function() {
    $( "#from" ).datepicker();
    $( "#to" ).datepicker();
} );


window.onload = function() {
    setTimeout(function() {
        $("#from").click(function() {
            $('.ui-datepicker').addClass("ui-datepicker-active");
        });

        $("#to").click(function() {
            $('.ui-datepicker').addClass("ui-datepicker-active");
        });
        $(document).click(function(event) {
            if (!$(event.target).closest('#to').length && !$(event.target).closest('#from').length) {
                $('.ui-datepicker').removeClass("ui-datepicker-active");
            }
        });
    }, 500);
    
    document.getElementById("searchButton").addEventListener("click", function () {
        console.log('start search');
        const enteredQuery = document.getElementById("query").value;
        const enteredFrom = document.getElementById("from").value;
        const enteredTo = document.getElementById("to").value;

        document.getElementById("enteredQuery").innerHTML = enteredQuery;
        document.getElementById("enteredFrom").innerHTML = enteredFrom;
        document.getElementById("enteredTo").innerHTML = enteredTo;

        searchNews(enteredQuery, enteredFrom, enteredTo);
        console.log('end search');
    })
}

function searchNews(query, from, to) {
    // Your code to search for news goes here
    console.log(`Searching for news with query: ${query}, from: ${from}, to: ${to}`);
    const sortBy = "popularity";
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/news",
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
}

