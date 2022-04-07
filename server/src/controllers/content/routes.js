const app = require("express").Router();

const methods = require("./methods");

app.get("/block", methods.getBlockApi);
app.get("/list", methods.getClomnLists);

module.exports = app;
