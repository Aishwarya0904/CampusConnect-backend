const express = require("express");

const router = express.Router();

const {
createEvent,
getEvents,
registerEvent,
deleteEvent
}=require("../controllers/eventController");


const authMiddleware = require("../middleware/authMiddleware");


// Public/student
router.get("/", getEvents);


// Admin create
router.post(
"/create",
authMiddleware,
createEvent
);


// Student register
router.post(
"/:id/register",
authMiddleware,
registerEvent
);


// Admin delete
router.delete(
"/:id",
authMiddleware,
deleteEvent
);


module.exports = router;