require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

const usersRouter = require("./api/users");
const productsRouter = require("./api/products");
const cartRouter = require("./api/cart");
const ordersRouter = require("./api/orders");
const paymentDetailsRouter = require("./api/paymentDetails");
const orderHistoryRouter = require("./api/orderHistory");
const inventoryRouter = require("./api/inventory");
const promotionsRouter = require("./api/promotions");

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/paymentDetails", paymentDetailsRouter);
app.use("/api/order-history", orderHistoryRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/promotions", promotionsRouter);

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// User-related functions
const { createNewUser, fetchUserByUsername } = require("./db/users");

// Register endpoint
app.post("/api/users/register", async (req, res) => {
  try {
    const myNewUserData = req.body;
    console.log(myNewUserData);

    if (!myNewUserData.username || !myNewUserData.password) {
      res.send({
        error: true,
        message: "You failed to provide either a username or a password text.",
        data: null,
      });
    } else {
      const helperVarForUserData = {
        username: req.body.username,
        admin: req.body.admin,
      };
      const token = await jwt.sign(
        helperVarForUserData,
        process.env.JWT_SECRET
      );

      const mySaltRoundsForPW = await bcrypt.genSalt(12);
      const myHashedPassword = await bcrypt.hash(
        myNewUserData.password,
        mySaltRoundsForPW
      );

      const myNewUserInDb = await createNewUser({
        username: myNewUserData.username,
        password: myHashedPassword,
        is_admin: myNewUserData.admin,
      });

      if (myNewUserInDb) {
        res
          .send({
            userId: myNewUserInDb.user_id,
            error: false,
            data: token,
            message: "Thanks for registering with us!",
          })
          .status(200);
      } else {
        res
          .send({
            error: true,
            data: null,
            message: "Failed to register user, please try again.",
          })
          .status(401);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// Login endpoint
app.post("/api/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.length || !password.length) {
      res.send({
        error: true,
        message: "You failed to provide either a username or a password text.",
        data: null,
      });
    } else {
      const userFromDb = await fetchUserByUsername(username);
      console.log(userFromDb);

      if (userFromDb && (await bcrypt.compare(password, userFromDb.password))) {
        const token = await jwt.sign(
          {
            username: userFromDb.username,
            admin: userFromDb.admin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );

        if (token) {
          res
            .send({
              userId: userFromDb.user_id,
              error: false,
              data: token,
              message: "Thanks for logging in!",
            })
            .status(200);
        } else {
          res
            .send({
              error: true,
              data: null,
              message: "Failed to log in!",
            })
            .status(401);
        }
      } else {
        res
          .send({
            error: true,
            data: null,
            message: "Invalid username or password.",
          })
          .status(401);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
