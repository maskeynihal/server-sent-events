const app = require("express")();
const cors = require("cors");
const fs = require("fs");

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => res.send("hello!"));

app.get("/stream", (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
});

const port = process.env.PORT || 8888;
const serverName = process.env.SERVER_NAME || "sample";

let i = 0;
function send(res) {
  console.log("HERE", i);

  res.write("data: " + `hello from ${serverName} ---- [${i++}]\n\n`);

  setTimeout(() => send(res), 1000);
}

app.get("/test", (req, res) => {
  res.setHeader("content-type", "text/html");

  return res.sendFile(__dirname + "/index.html");
});

app.listen(port);
console.log(`Listening on ${port}`);
