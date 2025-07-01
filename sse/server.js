const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const compression = require("compression");

const app = express();

// 1) SSE endpoint FIRST, before any other middleware
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

// 2) Now compression for everything else
app.use(
  compression({
    // (optional) you can still double-check the path
    filter: (req, res) => req.path !== "/events" && compression.filter(req, res),
  })
);

// 3) CORS for JSON API
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
  })
);

// 4) json-server defaults with NO compression
app.use(jsonServer.defaults({ noCompression: true }));

// 5) Capture POST /bids body
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

// SSE broadcaster machinery
let clients = [];
const sendEvent = (data) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((res) => {
    res.write(payload);
    if (typeof res.flush === "function") res.flush();
  });
};

// 6) After a bid is written, broadcast to all SSE clients
app.use((req, res, next) => {
  res.on("finish", () => {
    if (req.method === "POST" && req.path === "/bids" && res.locals.data) {
      console.log("📡 Pushing SSE:", res.locals.data);
      sendEvent({ type: "new_bid", bid: res.locals.data });
    }
  });
  next();
});

// 7) JSON-server router
app.use(jsonServer.router("db.json"));

// 8) Start listening
app.listen(3000, () =>
  console.log("✅ Server + SSE running on http://localhost:3000")
);
