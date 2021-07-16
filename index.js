import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
mongoose.set("useFindAndModify", false);
