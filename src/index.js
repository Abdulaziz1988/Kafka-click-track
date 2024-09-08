const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const KafkaProducer = require("./kafka/producer");
const KafkaConsumer = require("./kafka/consumer");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Initialize Kafka producer and consumer
const kafkaProducer = new KafkaProducer();
const kafkaConsumer = new KafkaConsumer();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up routes
app.use("/", routes);

// Create HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
});

// Broadcast coordinates to all connected clients
function broadcastCoordinates(coordinates) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(coordinates));
    }
  });
}

// Listen for new messages from Kafka and broadcast them
kafkaConsumer.consumer.on("message", (message) => {
  const event = JSON.parse(message.value);
  if (event.coordinates) {
    broadcastCoordinates(event.coordinates);
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
