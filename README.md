
## Features

- **Event Triggering**: Click events on the website are captured along with mouse coordinates.
- **Kafka Integration**: Events are pushed to a Kafka broker.
- **Data Visualization**: Mouse click coordinates are visualized on a separate endpoint.

## Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/Abdulaziz1988/Kafka-click-track.git
    ```

2. **Install the dependencies**:

    ```sh
    cd nodejs-kafka-website
    npm install
    ```

3. **Set up the environment variables**:

    Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fabdulaziz%2FDocuments%2Fcoding%2Fnodejs-kafka-website%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22fa3c4a74-ce0c-4cfa-9239-6e3b55d58d86%22%5D "/Users/abdulaziz/Documents/coding/nodejs-kafka-website/.env") file in the root directory and add the following variables:

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

## Usage

1. **Start the server**:

    ```sh
    npm start
    ```

2. **Open your web browser and navigate to** [`http://localhost:3000`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fabdulaziz%2FDocuments%2Fcoding%2Fnodejs-kafka-website%2FREADME.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A57%2C%22character%22%3A42%7D%7D%5D%2C%22fa3c4a74-ce0c-4cfa-9239-6e3b55d58d86%22%5D "Go to definition").

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

## License

This project is licensed under the MIT License. See the LICENSE file for details.