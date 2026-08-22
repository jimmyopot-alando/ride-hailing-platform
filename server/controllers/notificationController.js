// server/controllers/notificationController.js
const Notification = require("../models/Notification");
const User = require("../models/User");

// @desc    Send a notification to a user
// @route   POST /api/notifications
// @access  Private/Admin or System
exports.sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const notification = new Notification({
      userId,
      type, // e.g. "ride_update", "payment", "surge_alert"
      message,
      read: false,
    });

    await notification.save();

    res.status(201).json({
      message: "Notification sent successfully",
      notification,
    });
  } catch (error) {
    console.error("❌ Send notification error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error("❌ Fetch notifications error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    if (notification.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this notification" });
    }

    notification.read = true;
    await notification.save();

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("❌ Mark as read error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    if (notification.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this notification" });
    }

    await notification.deleteOne();

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("❌ Delete notification error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
