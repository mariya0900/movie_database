const express=require("express");
var fs = require('fs');
const http = require('http');
const app=express();
const jsdom = require("jsdom");
const apiKey = "516138aa";

app.get("/", (request, response) => {
    fs.readFile('index.html', function(err, fileContents) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        /*response.write(data);
        return response.end();*/
        http.get(`http://www.omdbapi.com/?i=tt0059113&apikey=${apiKey}`, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                data = JSON.parse(data);
                response.write(fileContents.toString().replace("@@title", data['Title'])
                    .replace("@@year", data['Year'])
                        .replace("@@genre", data['Genre'])
                            .replace("@@runtime", data['Runtime'])
                                .replace("@@director", data['Director'])
                                    .replace("@@writer", data['Writer'])
                                        .replace("@@actors", data['Actors'])
                                            .replace("@@plot", data['Plot'])
                                                .replace("@@rating", data['Ratings'][0]['Value'])
                                                    .replace("@@poster", data['Poster']));
                return response.end();
            });
        }).on('error', (err) => {
            response.write(err);
            return response.end();
        });
    });
});

app.listen(80, () => { 
    console.log("listening");
});

