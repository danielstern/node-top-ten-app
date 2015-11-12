var express = require('express');

var app = new express();

app.use(express.static('app'));

app.listen(7777);