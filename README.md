# Receipt Processor Challenge

This is a backend take-home assignment for the Fetch Rewards assessment. The application is built using TypeScript, Node.js, and Express. It utilizes an in-memory database, meaning the data is not persisted when the application is restarted. As a result, there are no external database dependencies required.

# Endpoints:

1. POST - /receipts/process
- Payload: Receipt JSON
- Response: JSON containing an id for the receipt.

2. GET - /receipts/{id}/points
- Response: A JSON object containing the number of points awarded.

# How to Run the API

A Dockerfile is provided to containerize the application. The app will run on port 3000, so please ensure that port 3000 is available on your local machine. To get started, clone the repository and ensure Docker Desktop is installed. Then, run the following commands:

1. Build the Docker image
   `docker build -t receipt-processor-app .`

2. Start the server
   `docker run -p 3000:3000 receipt-processor-app`

Alternatively, if Node.js, Typescript, and npm are installed, you can install the dependencies and run the server without Docker:

1. Install dependencies
   `npm install`

2. Start the server
   `npm start`

Once the server is running, you can interact with it using any API testing tool by sending requests to the following endpoints:

- GET - `localhost:3000/reciepts/{id}/points`
- POST - `localhost:3000/receipts/process`

Additionally, a JSON collection is provided in the repository [Receipt-Processor-Collection](https://github.com/fsanche3/receipt-processor-challenge/blob/main/Receipt-Processor-Collection.json) that can be imported into most API testing tools.

# Testing

Automated unit tests are executed during the Docker build process using Jest. These tests can also be ran outside the container if the necessary dependencies are installed.

# Takeaways

I thoroughly enjoyed working on this assignment. As my first take-home assessment, it made the interview process more engaging. While the code is not yet production-ready, it provides a solid foundation, and further enhancements would be required to scale it for production use. I look forward to progressing to the next stage of the interview process and appreciate your time in reviewing my application.
