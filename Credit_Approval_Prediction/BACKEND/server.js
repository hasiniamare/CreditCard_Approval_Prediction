
// const express = require("express");
// const cors = require('cors');
// const admin = require("firebase-admin");
// const firebaseConfig = require("./firebaseConfig");

// require("dotenv").config(); // Load environment variables from .env file

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 3001;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Initialize Firebase Admin SDK
// const serviceAccount = {
//     "type": "service_account",
//     "project_id": process.env.FIREBASE_PROJECT_ID,
//     "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//     "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//     "client_id": process.env.FIREBASE_CLIENT_ID,
//     "auth_uri": process.env.FIREBASE_AUTH_URI,
//     "token_uri": process.env.FIREBASE_TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
//     "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
// };

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: process.env.FIREBASE_DATABASE_URL
// });


// const db = admin.firestore();
// // // POST endpoint to save username and password in Firebase Authentication
// // // POST endpoint for user login
// // app.post("/login", async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //         // Implement your login logic here, e.g., using Firebase Authentication
// //         // For simplicity, let's assume a successful login for any email and password combination
// //         res.status(200).send("Login successful!");
// //     } catch (error) {
// //         console.error("Login failed:", error);
// //         res.status(500).send("Error logging in.");
// //     }
// // });

// // GET endpoint to fetch data
// // Assume you have a 'users' collection in Firestore
// // const usersCollection = admin.firestore().collection('users');

// // app.get('/data', async (req, res) => {
// //   try {
// //     // Fetch all documents from the 'users' collection
// //     const snapshot = await usersCollection.get();
// //     const data = snapshot.docs.map(doc => doc.data());

// //     res.status(200).json(data); // Send the fetched data as a JSON response
// //   } catch (error) {
// //     console.error('Fetching data failed:', error);
// //     res.status(500).send('Failed to fetch data.');
// //   }
// // });




// // POST endpoint to save user data in the 'customer-data' collection
// // app.post('/customer-data', async (req, res) => {
// //     try {
// //       // Assuming you have a patients collection in your Firestore
// //       await customerCollection.add(req.body);
// //       res.status(200).json({ message: 'customer-data details saved successfully' });
// //       console.log('saved');
// //     } catch (error) {
// //       console.error('Error saving customer-datat details:', error);
// //       res.status(500).json({ message: 'Failed to save patient details'});
// // }
// // });



// app.post('/customer-data', async (req, res) => {
//   try {
//     // Assuming you have a patients collection in your Firestore
//     await db.collection('customers').add(req.body);
//     res.status(200).json({ message: 'customer-data details saved successfully' });
//     console.log('saved');
//   } catch (error) {
//     console.error('Error saving customer-datat details:', error);
//     res.status(500).json({ message: 'Failed to save patient details' });
// }
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

//correct code below

const express = require('express');
const admin = require("firebase-admin");
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const credential = require("./cred.json");

admin.initializeApp({
  credential: admin.credential.cert(credential)
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'));

app.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Retrieve user data from Firestore using the username from both collections
      const assistantSnapshot = await db.collection('Assistants').doc(username).get();
      const managerSnapshot = await db.collection('admin').doc(username).get();

      let userData = null;
      let userRole = null;

      // Check if user exists in assistants collection
      if (assistantSnapshot.exists) {
          userData = assistantSnapshot.data();
          userRole = 'assistant';
      }
      // Check if user exists in managers collection
      else if (managerSnapshot.exists) {
          userData = managerSnapshot.data();
          userRole = 'admin';
      }
      // If user does not exist in any collection, return invalid credentials
      else {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare plaintext password
      if (password !== userData.password) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', userRole });
      console.log("loggin sucssess")
  } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Login failed' });
  }
});



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique file names
  },
});

const upload = multer({ storage: storage });
app.post('/register', upload.single('profilePic'), async (req, res) => {
  try {
      const { name, mobileNumber, address, email, username, password, userRole } = req.body;
      const profilePic = req.file;

      // If profilePic is uploaded, store the URL, otherwise, set it to null
      let profilePicUrl = null;
      if (profilePic) {
          profilePicUrl = `/uploads/${profilePic.filename}`;
      }

      // Save user profile data to Firestore
      await db.collection(userRole === 'assistant' ? 'Assistants' : 'admin').doc(username).set({
          name,
          mobileNumber,
          address,
          email,
          username,
          password,
          userRole,
          profilePicUrl // Save the profile picture URL
      });

      res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Registration failed' });
  }
});

app.get('/register/:username', async (req, res) => {
  const { username } = req.params;

  try {
      // Check if the user exists in labAssistants collection
      let userData = await db.collection('Assistants').doc(username).get();

      // If user doesn't exist in labAssistants, check in labManagers collection
      if (!userData.exists) {
          userData = await db.collection('admin').doc(username).get();
      }

      if (!userData.exists) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Retrieve user data
      const userDataObject = userData.data();

      res.status(200).json({
          name: userDataObject.name,
          mobileNumber: userDataObject.mobileNumber,
          address: userDataObject.address,
          email: userDataObject.email,
          username: userDataObject.username,
          userRole: userDataObject.userRole,
          profilePicUrl: userDataObject.profilePicUrl
      });
      
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route handler for fetching total user registration count
app.get('/total-user-registration', async (req, res) => {
  try {
    const assistantSnapshot = await db.collection('Assistants').get();
    const managerSnapshot = await db.collection('admin').get();

    const totalUserRegistration = assistantSnapshot.size + managerSnapshot.size;
    res.status(200).json({ totalUserRegistration });
  } catch (error) {
    console.error('Error fetching total user registration count:', error);
    res.status(500).json({ message: 'Failed to fetch total user registration count' });
  }
});



// Route handler for file upload
app.post('/customer-data', async (req, res) => {
  try {
    // Assuming you have a customer collection in your Firestore
    await db.collection('customers').add(req.body);
    res.status(200).json({ message: 'customer-data details saved successfully' });
    console.log('saved');
  } catch (error) {
    console.error('Error saving customer-datat details:', error);
    res.status(500).json({ message: 'Failed to save customer details' });
}
});

app.post('/upload', upload.single('profilePic'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Process the uploaded file or save its path to a database
  const filePath = req.file.path;
  res.status(200).json({ message: 'File uploaded successfully', filePath });
});

// Fetch all customers details route
app.get('/all-customer-details', async (req, res) => {
  try {
      const customerSnapshot = await db.collection('customers').get();
      const customer = [];
      customerSnapshot.forEach(doc => {
          customer.push(doc.data());
      });
      res.status(200).json(customer);
  } catch (error) {
      console.error('Error fetching customer details:', error);
      res.status(500).json({ message: 'Failed to fetch cutomer details'});
  }
});

// Route handler for getting the total customer count
app.get('/total-customer-count', async (req, res) => {
  try {
    const customerSnapshot = await db.collection('customers').get();
    const totalCustomerCount = customerSnapshot.size;
    res.status(200).json({ totalCustomerCount });
  } catch (error) {
    console.error('Error fetching total customer count:', error);
    res.status(500).json({ message: 'Failed to fetch total customer count' });
  }
});




// Route handler for updating CreditRisk in all documents of the customers collection
app.put('/update-CreditRisk', async (req, res) => {
  try {
    const { CreditRisk } = req.body;

    // Query all documents in the customers collection
    const snapshot = await db.collection('customers').get();

    // Create a batch to perform batch updates
    const batch = db.batch();

    // Iterate through each document in the snapshot and update the CreditRisk field
    snapshot.forEach((doc) => {
      const customerRef = db.collection('customers').doc(doc.id); // Get reference to the document
      batch.update(customerRef, { CreditRisk: CreditRisk }); // Update CreditRisk field in the batch
    });

    // Commit the batch update
    await batch.commit();

    // Notify the frontend that CreditRisk was updated successfully for all documents
    res.status(200).json({ message: 'CreditRisk updated successfully for all documents' });
  } catch (error) {
    console.error('Error updating CreditRisk:', error);
    res.status(500).json({ message: 'Failed to update CreditRisk' });
  }
});

// Route handler for approving a customer application
app.put('/approve-application/:nic', async (req, res) => {
  try {
    const { nic } = req.params;

    // Assuming you have a customers collection in your Firestore
    const customerSnapshot = await db.collection('customers').where('nic', '==', nic).get();

    if (customerSnapshot.empty) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Assuming you have a single document for each customer with a unique NIC
    const customerDoc = customerSnapshot.docs[0];
    const customerData = customerDoc.data();

    if (customerData.ApplicationStatus === 'Approved') {
      return res.status(400).json({ message: 'Application already approved' });
    }

    // Update the ApplicationStatus to 'Approved' in Firestore
    await db.collection('customers').doc(customerDoc.id).update({ ApplicationStatus: 'Approved' });

    // You can also trigger other actions here such as sending notifications, etc.

    res.status(200).json({ message: 'Application approved successfully', customer: customerData });
    console.log`(Customer ${customerData.Name} approved and status saved)`;
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({ message: 'Failed to approve application' });
  }
});

// Route handler for rejecting a customer application
app.put('/reject-application/:nic', async (req, res) => {
  try {
    const { nic } = req.params;

    // Assuming you have a customers collection in your Firestore
    const customerSnapshot = await db.collection('customers').where('nic', '==', nic).get();

    if (customerSnapshot.empty) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Assuming you have a single document for each customer with a unique NIC
    const customerDoc = customerSnapshot.docs[0];
    const customerData = customerDoc.data();

    if (customerData.ApplicationStatus === 'Rejected') {
      return res.status(400).json({ message: 'Application already rejected' });
    }

    // Update the ApplicationStatus to 'Rejected' in Firestore
    await db.collection('customers').doc(customerDoc.id).update({ ApplicationStatus: 'Rejected' });

    // You can also trigger other actions here such as sending notifications, etc.

    res.status(200).json({ message: 'Application rejected successfully', customer: customerData });
    console.log`(Customer ${customerData.Name} rejected and status saved)`;
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({ message: 'Failed to reject application' });
  }
});


// Fetch approved, rejected, and pending customer counts route
app.get('/all-customer-details/status', async (req, res) => {
  try {
    const customerSnapshot = await db.collection('customers').get();
    let approvedCount = 0;
    let rejectedCount = 0;
    let pendingCount = 0;

    customerSnapshot.forEach((doc) => {
      const customerData = doc.data();
      if (customerData.ApplicationStatus === 'Approved') {
        approvedCount++;
      } else if (customerData.ApplicationStatus === 'Rejected') {
        rejectedCount++;
      } else {
        pendingCount++;
      }
    });

    res.status(200).json({
      approvedCount,
      rejectedCount,
      pendingCount,
    });
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ message: 'Failed to fetch customer details' });
  }
});

// Route handler for fetching approved and rejected counts
app.get('/approval-status-count', async (req, res) => {
  try {
    const customerSnapshot = await db.collection('customers').get();
    let approvedCount = 0;
    let rejectedCount = 0;

    customerSnapshot.forEach((doc) => {
      const customerData = doc.data();
      if (customerData.ApplicationStatus === 'Approved') {
        approvedCount++;
      } else if (customerData.ApplicationStatus === 'Rejected') {
        rejectedCount++;
      }
    });

    res.status(200).json({
      approvedCount,
      rejectedCount,
    });
  } catch (error) {
    console.error('Error fetching approval status count:', error);
    res.status(500).json({ message: 'Failed to fetch approval status count' });
  }
});

// Route handler for deleting customer data by NIC
app.delete('/delete-customer/:nic', async (req, res) => {
  try {
    const { nic } = req.params;

    // Check if the customer exists
    const customerSnapshot = await db.collection('customers').where('nic', '==', nic).get();
    if (customerSnapshot.empty) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Assuming there is only one document for each customer with a unique NIC
    const customerDoc = customerSnapshot.docs[0];

    // Delete the customer document from Firestore
    await db.collection('customers').doc(customerDoc.id).delete();

    res.status(200).json({ message: 'Customer data deleted successfully' });
    console.log(`Customer with NIC ${nic} deleted`);
  } catch (error) {
    console.error('Error deleting customer data:', error);
    res.status(500).json({ message: 'Failed to delete customer data' });
  }
});





// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log`(Server is running on port ${PORT})`;
});