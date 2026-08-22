// server/routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

// Send a notification (admin/system)
router.post("/", authMiddleware, sendNotification);

// Get all notifications for logged-in user
router.get("/", authMiddleware, getMyNotifications);

// Mark a notification as read
router.put("/:id/read", authMiddleware, markAsRead);

// Delete a notification
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;
