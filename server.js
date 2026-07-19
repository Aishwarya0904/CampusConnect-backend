const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());


// Test Route

app.get("/", (req,res)=>{
  res.json({
    success:true,
    message:"CampusConnect API is Running 🚀"
  });
});


// Routes

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/posts", require("./routes/postRoutes"));

app.use("/api/events", require("./routes/eventRoutes"));



// Start Server

connectDB()
.then(()=>{

  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((err)=>{

  console.log("MongoDB connection failed:",err);

});