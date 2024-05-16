const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const dbConnection = require("./configs/connectDB");
const errorHandler = require("./middlewares/error_middleware");
const authRoute = require("./routes/auth_route");
const userRoute = require("./routes/user_route");

dbConnection();
app.use(
  cors({
    origin: true,
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running.", PORT);
});
