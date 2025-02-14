const express = require("express"); // Import the Express framework
const app = express(); // Initialize the Express application
const port = process.env.PORT || 5000; // Define the server port, using an environment variable if available
const cors = require("cors"); // Import CORS to allow cross-origin requests

// middleware

app.use(cors()); // Enable CORS for handling requests from different origins
app.use(express.json()); // Enable JSON parsing for incoming requests

// Mongo DB Atlas System Related Database Username : Admin and Password : uHHQ3CAvQ3rYsc3n

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!"); // Respond with a simple message
});

// mongodb configuration

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Admin:uHHQ3CAvQ3rYsc3n@bvcluster.takf4.mongodb.net/?retryWrites=true&w=majority&appName=BVCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Log the server start message
});
