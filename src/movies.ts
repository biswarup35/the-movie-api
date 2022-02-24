import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import type { IMovie } from "./types";

const movies = async (_req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), "data", "movies.json");
    const data = fs.readFileSync(filePath, "utf8");
    const rawMovies = JSON.parse(data);
    const movies = rawMovies.map((movie: IMovie) => {
      const title = movie.title;
      const poster = movie.poster;
      const show_id = movie.show_id;
      const id = movie.id;
      return {
        title,
        poster,
        show_id,
        id,
      };
    });
    res.status(200).send(movies);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export default movies;
