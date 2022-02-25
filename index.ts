import express from "express";
import cors from "cors";
import shows from "./src/shows";
import movie from "./src/movie";
import movies from "./src/movies";
import comments from "./src/comments";
import postComments from "./src/postComments";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the MCU World!");
});

app.get("/shows", shows);
app.get("/movie/:show_id", movie);
app.get("/movies", movies);
app.get("/comments/:parentId", comments);
app.post("/comments", postComments);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
