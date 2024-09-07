const express = require('express');
const KafkaProducer = require('../kafka/producer');
const KafkaConsumer = require('../kafka/consumer');

const router = express.Router();

// Initialize Kafka producer
const producer = new KafkaProducer();

// Route handler for user click event
router.post('/event', (req, res) => {
  // Get event data from request body
  const eventData = req.body;
  console.log("Received event data:", eventData);

  // Push event to Kafka broker
  producer.pushEvent(eventData);

  // Send response to client
  res.sendStatus(200);
});

// Route handler for the root route
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'src/public' });
});

// Route handler for serving the plot
router.get('/points', (req, res) => {
  res.sendFile('points.html', { root: 'src/public' });
});

// Route handler for fetching coordinates data
router.get('/api/coordinates', (req, res) => {
  res.json(KafkaConsumer.coordinates);
});

// Export the router
module.exports = router;