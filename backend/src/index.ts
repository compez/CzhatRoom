import express from "express";
import httpServer from "http";
import socket from "socket.io";

const app = express();
const port = 8080; // default port to listen
const http = new httpServer.Server(app);
const io = socket(http);
const greeting = [{name: "websocket, ", message: "is working now"}];
// define a route handler for the default home page

// io.origins("*:*");

app.get("/hello", (req, res) => {
    res.send("Hello There");
});

io.on("connection", (chatter: any): void => {
    console.log("connection data ");
    chatter.on("chat", (data: any) => {
        io.sockets.emit("chat", data);
    });
});

http.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
