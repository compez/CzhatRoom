"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const port = 8080; // default port to listen
const http = new http_1.default.Server(app);
const io = socket_io_1.default(http);
const greeting = [{ name: "websocket, ", message: "is working now" }];
// define a route handler for the default home page
// io.origins("*:*");
app.get("/hello", (req, res) => {
    res.send("Hello There");
});
io.on("connection", (chatter) => {
    console.log("connection data ");
    chatter.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });
});
http.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map