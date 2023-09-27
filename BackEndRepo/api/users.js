const express = require("express");
const router = express.Router();
const {
  fetchAllUsers,
  updateUser,
  deleteUser,
  addUserDetails,
  fetchUserDetailsByUserId,
  fetchAllUsersAndDetails,
  fetchUserByUserId,
} = require("../db/users");

// Add a user account details
router.post("/:userId/details", async (req, res) => {
  try {
    const { userId } = req.params;
    const userDetails = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code,
      country: req.body.country,
    };

    const user = await addUserDetails(userId, userDetails);

    res.json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await fetchAllUsers();

    if (allUsers && allUsers.length) {
      res.json(allUsers);
    } else {
      res.send("No users were found");
    }
  } catch (error) {
    console.error("Error retrieving users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req.body;

    const updatedUser = await updateUser(userId, user);

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    await deleteUser(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch user details by userid
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const userDetails = await fetchUserDetailsByUserId(userid);

    res.json(userDetails);
  } catch (error) {
    console.error("Error retrieving user details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch user by userid
router.get("/userid/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await fetchUserByUserId(userid);

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all users and details
router.get("/users/details", async (req, res) => {
  try {
    const allUsers = await fetchAllUsersAndDetails();

    if (allUsers && allUsers.length) {
      res.json(allUsers);
    } else {
      res.send("No users were found");
    }
  } catch (error) {
    console.error("Error retrieving users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
