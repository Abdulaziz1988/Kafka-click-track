const express = require('express');
const KafkaProducer = require('./kafka/producer');
const KafkaConsumer = require('./kafka/consumer');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Kafka producer and consumer
const kafkaProducer = new KafkaProducer();
const kafkaConsumer = new KafkaConsumer();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up routes
app.use('/', routes);

// Endpoint to serve the plot
app.get('/points', (req, res) => {
  res.sendFile('points.html', { root: 'src/public' });
});

// Endpoint to get coordinates data
app.get('/api/coordinates', (req, res) => {
  res.json(KafkaConsumer.coordinates);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});