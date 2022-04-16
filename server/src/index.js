const express = require("express");
const cors = require("cors");

const contentController = require("./controllers/content/routes");

const app = express();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use("/api/content", contentController);

app.listen(9001);
