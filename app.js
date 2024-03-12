const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

mongoose.connect(
  "mongodb+srv://kareola960:1234@cluster0.9jieh8n.mongodb.net/?retryWrites=true&w=majority",
  {
    tls: true,
  }
);

// Check connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

//Routes
app.get("/getfeedback", async (req, res) => {
  try {
    const feedbackEntries = await Feedback.find();

    res.json(feedbackEntries);
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/sendfeedback", async (req, res) => {
  // Handle the form submission logic here
  const { name, email, message } = req.body;

  try {
    // Create a new feedback instance
    const newFeedback = new Feedback({
      name,
      email,
      message,
    });

    // Save the feedback to the database
    await newFeedback.save();

    alert("Successful!");
    window.location.href = "/feedback.html";
  } catch (error) {
    console.error("Error saving feedback:", error);
    // Handle error accordingly
  }
  res.sendFile(__dirname + "/public/feedback.html");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
