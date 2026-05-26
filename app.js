const express = require("express");
require("dotenv").config();
require("./db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
