const express = require("express");
const router = express.Router();

// Mock data for logistics providers
const logisticsProviders = [
  { id: 1, name: "AgroTrans Logistics", phone: "+91-9000000001", serviceArea: "Local & Regional", rating: 4.7 },
  { id: 2, name: "Farmers Freight", phone: "+91-9000000002", serviceArea: "Statewide", rating: 4.5 },
  { id: 3, name: "GreenField Transport", phone: "+91-9000000003", serviceArea: "National", rating: 4.8 }
];

// Mock shipments data
let shipments = [
  { shipmentId: "SHIP123", status: "In Transit", estimatedDelivery: "2024-07-05", transporter: "AgroTrans Logistics" },
  { shipmentId: "SHIP124", status: "Delivered", estimatedDelivery: "2024-06-28", transporter: "Farmers Freight" }
];

// GET /api/logistics/providers
// Returns list of logistics providers
router.get("/providers", (req, res) => {
  res.json(logisticsProviders);
});

// POST /api/logistics/request
// Request transport for crops
// Expects JSON body: { farmerName, contact, pickupLocation, dropLocation, cropType, quantity }
router.post("/request", (req, res) => {
  const { farmerName, contact, pickupLocation, dropLocation, cropType, quantity } = req.body;

  if (!farmerName || !contact || !pickupLocation || !dropLocation || !cropType || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // In real app, save request to DB and assign transporter
  const assignedTransporter = logisticsProviders[0]; // Simple assignment for demo

  // Create a mock shipment record
  const shipmentId = `SHIP${Math.floor(Math.random() * 10000)}`;
  const newShipment = {
    shipmentId,
    status: "Scheduled",
    estimatedDelivery: "2024-07-10",
    transporter: assignedTransporter.name,
    pickupLocation,
    dropLocation,
    cropType,
    quantity,
    farmerName,
    contact
  };
  shipments.push(newShipment);

  res.json({
    message: "Transport request received",
    shipmentId,
    assignedTransporter: assignedTransporter.name,
    contact: assignedTransporter.phone,
    estimatedDelivery: newShipment.estimatedDelivery
  });
});

// GET /api/logistics/track/:shipmentId
// Track shipment status by shipmentId
router.get("/track/:shipmentId", (req, res) => {
  const { shipmentId } = req.params;
  const shipment = shipments.find(s => s.shipmentId === shipmentId);

  if (!shipment) {
    return res.status(404).json({ error: "Shipment not found" });
  }

  res.json({
    shipmentId: shipment.shipmentId,
    status: shipment.status,
    estimatedDelivery: shipment.estimatedDelivery,
    transporter: shipment.transporter
  });
});

module.exports = router;