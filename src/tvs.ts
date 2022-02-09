import { Request, Response } from "express";
import { JSDOM } from "jsdom";
import axios from "axios";

const tvs = async (req: Request, res: Response) => {
  try {
    const { show_id } = req.query;
    const url = `https://www.rottentomatoes.com/tv/wandavision`;
    const headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      Host: "www.rottentomatoes.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:88.0) Gecko/20100101 Firefox/88.0",
      Pragma: "no-cache",
      TE: "Trailers",
      "Upgrade-Insecure-Requests": 1,
    };
    if (show_id) {
      const { data: html } = await axios.get(url, { headers });
      const dom = new JSDOM(html);
      const window = dom.window;
      const { document } = dom.window;
      const poster_container = dom.window.poster_link;
      const poster =
        poster_container?.querySelector("img").getAttribute("data-src") ??
        "http://via.placeholder.com/206x305";

      const _meta = document.querySelector("ul.content-meta.info");
      const list = _meta.querySelectorAll("li");
      const meta = Array.from(list)
        .slice(0, -1)
        .map((item) => ({
          label: item
            .querySelector(".meta-label.subtle")
            .textContent.replace(":", ""),
          value: item
            .querySelector(".meta-value")
            .textContent.trim()
            .replace(/\s\s+/g, " "),
        }));
      const castContainer = document.querySelector(".castSection");
      const allCast = castContainer.querySelectorAll(
        `.cast-item.media.inlineBlock`
      );

      const cast = Array.from(allCast).map((item) => ({
        name: item.querySelector("span").textContent.trim(),
        role: item
          .querySelector(".characters")
          .textContent.trim()
          .replace(/\s\s+/g, " "),
        image: item.querySelector("img").getAttribute("data-src"),
      }));

      const photos_root = window["photos-carousel-root"];
      const _photos = photos_root.querySelectorAll("img.PhotosCarousel__image");
      const photos = [];
      _photos.forEach((element: HTMLImageElement) => {
        photos.push(
          element.getAttribute("data-src").replace("300x300", "600x800")
        );
      });

      const movieSynopsis = window[`movieSynopsis`];
      const synopsis = movieSynopsis.textContent
        .trim()
        .replace(/\s\s+/g, " ")
        .replace(/\n/g, " ");

      res.status(200).json({
        message: "ok",
        poster,
        synopsis,
        meta,
        cast,
        photos,
      });
    } else {
      throw new Error("No show_id provided");
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export default tvs;
