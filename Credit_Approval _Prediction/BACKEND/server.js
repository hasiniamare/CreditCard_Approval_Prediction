
const express = require("express");
const cors = require('cors');
const admin = require("firebase-admin");
const firebaseConfig = require("./firebaseConfig");


require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = {
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Endpoint to handle Firebase-related requests
app.get("/api/firebase-config", (req, res) => {
    // Send the Firebase configuration to the frontend
    res.json(firebaseConfig);
});

// POST endpoint to save username and password in Firebase Authentication
// POST endpoint for user login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Implement your login logic here, e.g., using Firebase Authentication
        // For simplicity, let's assume a successful login for any email and password combination
        res.status(200).send("Login successful!");
    } catch (error) {
        console.error("Login failed:", error);
        res.status(500).send("Error logging in.");
    }
});

// GET endpoint to fetch data
// Assume you have a 'users' collection in Firestore
const usersCollection = admin.firestore().collection('users');

app.get('/data', async (req, res) => {
  try {
    // Fetch all documents from the 'users' collection
    const snapshot = await usersCollection.get();
    const data = snapshot.docs.map(doc => doc.data());

    res.status(200).json(data); // Send the fetched data as a JSON response
  } catch (error) {
    console.error('Fetching data failed:', error);
    res.status(500).send('Failed to fetch data.');
  }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
