const kafka = require('kafka-node');

class KafkaProducer {
  constructor() {
    const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER_URL || '0.0.0.0:9092' });
    this.producer = new kafka.Producer(client);

    this.producer.on('ready', () => {
      console.log('Kafka Producer is connected and ready.');
    });

    this.producer.on('error', (error) => {
      console.error('Error in Kafka Producer:', error);
    });
  }

  pushEvent(event) {
    const payloads = [
      {
        topic: 'user-behavior',
        messages: JSON.stringify(event),
      },
    ];

    this.producer.send(payloads, (error, data) => {
      if (error) {
        console.error('Error pushing event to Kafka:', error);
      } else {
        console.log('Event pushed to Kafka:', data);
      }
    });
  }
}

module.exports = KafkaProducer;