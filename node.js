// Load the dotenv library to access environment variables
require("dotenv").config();

// Read the API key from the environment variables
const apiKey = process.env.API_KEY;

// Use the API key in your application as needed
console.log("API Key:", apiKey);


const http = require('http');
const querystring = require('querystring');
const get_news = require('./breaking-news');
const add_db = require('./add-to-sqllite');
const get_db = require('./retreave-from-sqllite');

import('node-fetch');
console.log("test");

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const data = querystring.parse(body);
            console.log(data);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            });
            const result = await GetData(data.query, data.from, data.to, data.sortBy, apiKey);
            res.end(JSON.stringify(result));
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000/news');
});

async function checkAPI(query, from, to, sortBy, apiKey) {
    const newsAPIUrl = get_news.getNewsAPIUrl(query, from, to, sortBy, apiKey);
    console.log('retrieved from api');
    try {
        const data = await get_news.getNews(newsAPIUrl);
        data.articles.forEach(article => {
            add_db.addArticleToDB(article,query,from,to);
        });
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function GetData(query, from, to, sortBy, apiKey) {
    //TRY RECEIVE DATA FROM DATABASE
    try {
        const rows = await get_db.getArticles(query, from, to);
        if (rows.articles === undefined) {
            return await checkAPI(query, from, to, sortBy, apiKey);
        }
        else
        {
            console.log('retrieved from database');
            return rows;
        }        
    } catch (error) {
        console.log(error);
        return checkAPI(query, from, to, sortBy, apiKey);
    }
}