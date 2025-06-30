const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");

const app = express();
app.use(require("compression")());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
  })
);

app.use(jsonServer.defaults());

app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (req.method === "POST" && req.path === "/bids") {
      try {
        res.locals.data = JSON.parse(body);
      } catch (err) {
        console.error("Failed to parse JSON body for SSE:", err);
      }
    }
    return originalSend.call(this, body);
  };
  next();
});

let clients = [];
const sendEvent = (data) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(res => {
    res.write(payload);
    if (typeof res.flush === "function") res.flush();
  });
};

app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.method === "POST" && req.path === "/bids" && res.locals.data) {
      console.log("📡 Pushing SSE:", res.locals.data);
      sendEvent({ type: "new_bid", bid: res.locals.data });
    }
  });
  next();
});

// 3) SSE endpoint: make sure to send the right headers
app.get("/events", cors(), (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders();
  res.write(": connected\n\n");
  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

// 4) json-server router
app.use(jsonServer.router("db.json"));

app.listen(3000, () =>
  console.log("✅ Server + SSE running on http://localhost:3000")
);
