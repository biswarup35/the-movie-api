import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import type { IMovie } from "./types";

const movie = async (req: Request, res: Response) => {
  try {
    const { show_id } = req.params;
    if (!show_id) {
      res.status(500).send({ message: "show_id is required" });
      throw new Error("show_id is required");
    }
    const filePath = path.join(process.cwd(), "data", "movies.json");
    const data = fs.readFileSync(filePath, "utf8");
    const movies = JSON.parse(data);
    const movie = movies.find((movie: IMovie) => movie.show_id === show_id);

    res.status(200).json(movie);
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
};

export default movie;
