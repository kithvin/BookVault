const express = require("express"); // Import the Express framework
const app = express(); // Initialize the Express application
const port = process.env.PORT || 5000; // Define the server port, using an environment variable if available
const cors = require("cors"); // Import CORS to allow cross-origin requests

// ================================ Middleware Setup =============================================== //

app.use(cors()); // Enable CORS for handling requests from different origins
app.use(express.json()); // Enable JSON parsing for incoming requests

// =========================== MongoDB Atlas Configuration ========================================= //

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// MongoDB connection URI (Replace credentials with environment variables for security)
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

// ================================ Define API Routes =============================================== //

// Function to run the MongoDB connection and setup
async function run() {
  try {
    // Connect the client to the MongoDB server (Optional starting in v4.7)
    await client.connect();

    // Create a reference to the "books" collection inside the "BookInventory" database
    const bookCollections = client.db("BookInventory").collection("books");

    // ======================= POST: Upload a new book (Insert Data) ============================================ //
    /**
     * @route POST /upload-book
     * @desc Add a new book to the database
     * @access Public
     */
    app.post("/upload-book", async (req, res) => {
      const data = req.body; // Retrieve book data from request body
      const result = await bookCollections.insertOne(data); // Insert data into the books collection
      res.send(result); // Send back the insertion result
    });

    // ========================= GET: Retrieve all books =========================================== //
    /**
     * @route GET /all-book
     * @desc Get a list of all books from the database
     * @access Public
     */
    // app.get("/all-book", async (req, res) => {
    //   const books = bookCollections.find(); // Fetch all book records
    //   const result = await books.toArray(); // Convert cursor to an array
    //   res.send(result); // Send the book data as a response
    // });

    // ======================= PATCH: Update book details ======================================== //
    /**
     * @route PATCH /book/:id
     * @desc Update book details based on the provided book ID
     * @access Public
     */
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id; // Extract book ID from URL parameters
      const updateBookData = req.body; // Retrieve updated book data from request body
      const filter = { _id: new ObjectId(id) }; // Filter to find the book by ID
      const options = { upsert: true }; // If book doesn't exist, create a new entry

      // Define the update operation
      const updateDoc = {
        $set: {
          ...updateBookData, // Spread the updated book data into the document
        },
      };

      // Execute the update operation
      const result = await bookCollections.updateOne(filter,updateDoc,options);
      res.send(result); // Send back the update result
    });

    // ======================= DELETE: delete book details ========================================== //

    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id; // Extract book ID from URL parameters
      const filter = { _id: new ObjectId(id) }; // Filter to find the book by ID
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

  // ======================= Filter: filter book details (filter category) ================================== //

    /**
    * @route GET /filter-book
    * @desc Retrieve books based on a specific category
    * @access Public
    * @queryParam {string} category - (Optional) If provided, filters books by category
    */

  app.get("/all-book", async (req, res) => {
      let query = {}; // Default query to fetch all books

      // Check if a category filter is provided in the query parameters
      if(req.query?.category){
        query = {category:req.query.category} // Apply category filter
      }

      // Fetch books matching the filter criteria
      const result = await bookCollections.find(query).toArray();
      res.send(result); // Send the filtered book data as a response
  })


    // Send a ping request to confirm a successful connection to MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Uncomment if you want to close the connection after execution
  }
}

// Execute the run function and catch any errors that occur
run().catch(console.dir);

// ================================== Start the Server ========================================== //
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log the server start message
});
