import { Request, Response } from "express";
import { JSDOM } from "jsdom";
import axios from "axios";

const shows = async (req: Request, res: Response) => {
  try {
    const url =
      "https://www.rottentomatoes.com/franchise/marvel_cinematic_universe";
    const headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      Host: "www.rottentomatoes.com",
      Origin: "https://www.rottentomatoes.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:88.0) Gecko/20100101 Firefox/88.0",
      Pragma: "no-cache",
      TE: "Trailers",
      "Upgrade-Insecure-Requests": 1,
    };
    const { data: html } = await axios.get(url, { headers });
    const dom = new JSDOM(html);
    const window = dom.window;

    const container = window[`franchise-media`];
    const movieContainer = container.querySelector(
      ".franchise-media-list.js-franchise-media-list"
    );
    const list = movieContainer.querySelectorAll(".franchise-media-list__item");
    const shows = [];
    list.forEach((movie: HTMLElement) => {
      shows.push({
        title: movie
          .querySelector("h3")
          .textContent.trim()
          .replace(/\s\s+/g, " "),
        slug: movie.querySelector("a").getAttribute("href").trim(),
        show_id: movie
          .querySelector("a")
          .getAttribute("href")
          .trim()
          .split("/")[2],
        image: movie.querySelector("img").getAttribute("src"),
        rating:
          movie
            .querySelector(".franchise-media-list__audiences")
            ?.textContent.trim()
            .replace(/\s\s+/g, " ") ?? "n/a",
      });
    });
    const movies = shows.filter((show) => show.slug.includes("/m/"));
    const tv = shows.filter((show) => show.slug.includes("/tv/"));
    res.status(200).json({
      movies,
      tv,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export default shows;
