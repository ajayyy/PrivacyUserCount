import express from "express";
const app = express();

import * as Types from "./types";
import getHash from "./getHash";
import getRandomSalt from "./getRandomSalt";

var config: Types.Config = require('../config.json');

// Setup pretty JSON
if (config.mode === Types.Mode.development) app.set('json spaces', 2);

// Set production mode
app.set('env', config.mode || Types.Mode.production);

let averageUserCount = config.defaultUserCount;

let hashedIPSet = new Set();

let salt = getRandomSalt();
setInterval(() => {
    salt = getRandomSalt();

    averageUserCount = Math.max(averageUserCount, hashedIPSet.size);

    hashedIPSet.clear();
}, 48 * 60 * 60 * 1000);

app.post("/api/v1/addIP", (req, res) => {
    let hashedIP = req.query.hashedIP;

    if (hashedIP === undefined) {
        res.sendStatus(400);
        return;
    }

    hashedIPSet.add(getHash(hashedIP + salt));

    res.sendStatus(200);
});

app.get("/api/v1/userCount", (req, res) => {
    res.send({
        userCount: averageUserCount
    });
});

app.listen(config.port);