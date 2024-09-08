## Features

- **Event Triggering**: Click events on the website are captured along with mouse coordinates.
- **Kafka Integration**: Events are pushed to a Kafka broker.
- **Data Visualization**: Mouse click coordinates are visualized on a separate endpoint.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Abdulaziz1988/Kafka-click-track.git
   # change to master branch
   git checkout -m master
   ```

2. **Install the dependencies**:

   ```sh
   cd nodejs-kafka-website
   npm install
   ```

3. **Set up the environment variables**:

   Create a [`.env`] file in the root directory and add the following variables:

   ```env
   KAFKA_BROKER_URL=0.0.0.0:9092
   # KAFKA_USERNAME=<your-kafka-username>
   # KAFKA_PASSWORD=<your-kafka-password>
   ```

4. **Set up Kafka and Zookeeper using Docker**:

   Ensure you have Docker installed, then run:

   ```sh
   docker-compose up -d
   ```

   ```sh
   docker exec -it <kafka-container-id> kafka-topics.sh --create --topic user-behavior --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
   ```

## Usage

1. **Start the server**:

   ```sh
   npm start
   ```

2. **Open your web browser and navigate to** [`http://localhost:3000`]

3. **Click on the website to trigger the event**.

4. **View the coordinates**:

   - The event will be pushed to the Kafka broker.
   - Navigate to `http://localhost:3000/points` to see the plotted coordinates.

## Endpoints

- **Root Endpoint**: Serves the main page where click events are captured.
  - `GET /`
- **Event Endpoint**: Receives click events and pushes them to Kafka.
  - `POST /event`
- **Points Endpoint**: Serves the page that visualizes the mouse click coordinates.
  - `GET /points`
- **Coordinates API**: Provides the coordinates data as JSON.
  - `GET /api/coordinates`
