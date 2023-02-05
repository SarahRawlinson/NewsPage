
const axios = require('axios');

async function getNews(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        return {
            status: "ok",
            totalResults: data.articles.length,
            articles: data.articles
        };
    } catch (error) {
        console.error(error);
    }
}

function getNewsAPIUrl(query, from, to, sortBy, apiKey) {
    return `https://newsapi.org/v2/everything?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`;
}

module.exports = {
    getNews: getNews,
    getNewsAPIUrl: getNewsAPIUrl
};
