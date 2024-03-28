// database code
import app from './server.js';
import mongodb from 'mongodb';
import ReviewsDAO from './dao/reviewsDAO.js'; // DAO = data access object, Interacts with the database

const MongoClient = mongodb.MongoClient; // This is the MongoDB client object used to interact with the MongoDB database.
// const mongo_username = process.env["MONGO_USERNAME"]; // access the evironment variable. chris
// const mongo_password = process.env["MONGO_PASSWORD"]; // chris92341
const mongo_username = 'chris'; // access the evironment variable. chris
const mongo_password = 'chris92341'; // chris92341
// a URI is a generic term for identifying resources on the internet
// URLs and URNs are specific types of URIs that serve different purposes.
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@moviecluster.pxa69kk.mongodb.net/?retryWrites=true&w=majority&appName=movieCluster`;

const port = 8000;

MongoClient.connect( // This is a method of the MongoClient object used to establish a connection to the MongoDB database.
  uri, // The URI (Uniform Resource Identifier) of the MongoDB database
  {
    maxPoolSize: 50, // Maximum number of connections in the connection pool
    wtimeoutMS: 2500, // Write concern timeout in milliseconds
    useNewUrlParser: true
  }
).catch(err => {
  console.error(err.stack);
  process.exit(1); // end the program 
}).then(async client => { // client is an object return by the MongoClient.connect() method
  await ReviewsDAO.injectDB(client)
  // This is a method of the Express.js app object used to start the server. 
  // Connecting to the database (port:8000)
  app.listen(port, () => { 
    console.log(`listening on port ${port}`);
  })
})