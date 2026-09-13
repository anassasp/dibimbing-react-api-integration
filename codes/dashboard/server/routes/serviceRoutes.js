const express = require("express");
const router = express.Router();
const services = require("../data/services");

// GET /api/services — Retrieve all services
router.get("/", (req, res) => {
  res.json(services);
});

// POST /api/services — Create a new service
router.post("/", (req, res) => {
  const { name, price } = req.body;

  // Validate required fields
  if (!name || price === undefined || price === null) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  // Generate a new ID
  const newId = services.length > 0
    ? Math.max(...services.map(s => s.id)) + 1
    : 1;

  const newService = {
    id: newId,
    name,
    price: Number(price)
  };

  services.push(newService);

  res.status(201).json(newService);
});

// PATCH /api/services/:id — Update an existing service
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = services.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Service not found" });
  }

  const { name, price } = req.body;

  if (name !== undefined) services[index].name = name;
  if (price !== undefined) services[index].price = Number(price);

  res.json(services[index]);
});

// DELETE /api/services/:id — Delete a service
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = services.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Service not found" });
  }

  const deleted = services.splice(index, 1)[0];

  res.json(deleted);
});

module.exports = router;
