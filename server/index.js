const express = require("express");
const app = express();
const webSocket = require("ws");
const http = require("http");
const server = http.createServer(app);
const fs = require("fs");
const wss = new webSocket.Server({ server });
app.use(express.json());
let clients = [];
const flows = JSON.parse(fs.readFileSync("./flows.json", "utf-8"));
app.post("/create-flow", (req, res) => {
    const message = req.body || null;
    if (!message) {
        return res.status(400).send("Invalid request");
    }
    flows.push(message);
    fs.writeFileSync("./flows.json", JSON.stringify(flows));
    res.status(200).send("Flow Created");
});
app.post("/trigger-popup", (req, res) => {
    const message = req.body.flow || null;
    if (!message) {
        return res.status(400).send("Invalid request");
    }
    const flow = flows.find((flow) => flow.name === message);
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(flow.steps));
        }
    });
    res.status(200).send("Popup triggered");
});
wss.on("connection", (ws) => {
    console.log("Client connected");
    clients.push(ws);
    console.log(clients.length);
    ws.on("close", () => {
        console.log("User disconnected");
        clients = clients.filter((client) => client !== ws);
    });
});
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
