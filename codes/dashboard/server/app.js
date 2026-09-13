const express = require("express");
const cors = require("cors");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/services", serviceRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
