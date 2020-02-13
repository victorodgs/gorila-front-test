var cors = require ('cors');
var express = require ('express');
var bodyparser = require ('body-parser');
const routes = require ('./routes');
var port = 3001;
var app = express ();

app.use (cors ());
app.disable ('x-powered-by');
app.use (bodyparser.json ());
app.use (bodyparser.urlencoded ({extended: true}));
app.use (routes);
app.listen (port);
