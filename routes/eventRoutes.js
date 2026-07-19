const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  registerEvent,
  deleteEvent
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");


// GET ALL EVENTS (Students/Public)
router.get("/", getEvents);


// CREATE EVENT (Admin)
router.post(
  "/create",
  protect,
  createEvent
);


// REGISTER EVENT (Students)
router.post(
  "/:id/register",
  protect,
  registerEvent
);


// DELETE EVENT (Admin)
router.delete(
  "/:id",
  protect,
  deleteEvent
);


module.exports = router;