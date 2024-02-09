import express from "express";
import fs from "fs";
const app = express();

import * as Types from "./types";
import getHash from "./getHash";
import getRandomSalt from "./getRandomSalt";

const config: Types.Config = getConfig();

// Setup pretty JSON
if (config.mode === Types.Mode.development) app.set('json spaces', 2);

// Set production mode
app.set('env', config.mode || Types.Mode.production);

let averageUserCount = 0;

let hashedIPSet = new Set();

let salt = getRandomSalt();
setInterval(() => {
    salt = getRandomSalt();

    averageUserCount = hashedIPSet.size;

    hashedIPSet.clear();
}, 48 * 60 * 60 * 1000);

app.post("/api/v1/addIP", (req, res) => {
    let hashedIP = req.query.hashedIP;

    if (hashedIP === undefined) {
        res.sendStatus(400);
        return;
    }
    
    res.sendStatus(200);

    hashedIPSet.add(getHash(hashedIP + salt));
});

app.get("/api/v1/userCount", (req, res) => {
    res.send({
        userCount: Math.max(averageUserCount, config.defaultUserCount)
    });
});

app.get("/api/v1/rawUserCount", (req, res) => {
    res.send({
        userCount: averageUserCount,
        nextCount: hashedIPSet.size
    });
});

app.listen(config.port);

function getConfig(): Types.Config {
    if (process.env.PORT) {
        return {
            port: parseInt(process.env.PORT),
            mode: process.env.MODE as Types.Mode || Types.Mode.development,
            defaultUserCount: parseInt(process.env.DEFAULT_USER_COUNT || "0")
        };
    }

    return JSON.parse(fs.readFileSync("config.json").toString("utf8"));
}
