const kafka = require('kafka-node');

class KafkaConsumer {
    constructor() {
        const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER_URL || '0.0.0.0:9092' });
        this.consumer = new kafka.Consumer(
            client,
            [{ topic: 'user-behavior', partition: 0 }],
            { autoCommit: true }
        );

        this.consumer.on('message', (message) => {
            console.log('Received message:', message);
            const event = JSON.parse(message.value);
            if (event.coordinates) {
                KafkaConsumer.coordinates.push(event.coordinates);
            }
        });

        this.consumer.on('error', (error) => {
            console.error('Error in Kafka Consumer:', error);
        });
    }

    static coordinates = [];
}

module.exports = KafkaConsumer;