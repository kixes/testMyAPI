const express = require('express')
const request = require('request');
const app = express()
const port = 8082

// create the proxy server
var proxy = (req,res) => {
    proxy_headers = req.headers["x-proxy-headers"]
    proxy_url = req.headers["x-proxy-redirect"]
    if(proxy_headers != null || proxy_headers != undefined ) proxy_headers = JSON.parse( proxy_headers )
    const options = {
            url: proxy_url,
            headers: proxy_headers,
            data: req.data,
            method:req.method
        };
    console.log(`
======================================
== Attempting to establish connection: ${proxy_url}
======================================
    `)
    request(options, (error, response, body)=>{
        console.log('error:', error); // Print the error if one occurred.
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received.
        console.log('body:', body); // Print the body of the response.
        res.send(`{ "error" : "${error}" , "response" : "${ JSON.stringify ( response ) }" }`) //Send response to the client
    });

}

//setup router
app.use('/', express.static( 'public_html' ) )
app.get('/proxy', proxy)
app.post('/proxy',proxy)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
