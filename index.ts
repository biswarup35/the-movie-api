import express from "express";
import cors from "cors";
import shows from "./src/shows";
import movies from "./src/movies";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the MCU World!");
});

app.get("/shows", shows);
app.get("/movies", movies);
app.get("/tvs", movies);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});