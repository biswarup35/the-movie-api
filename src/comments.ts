import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { makeTree } from "./utils";
import type { IComments } from "./types";

const comments = async (req: Request, res: Response) => {
  try {
    const { parentId } = req.params;
    if (!parentId) {
      res.status(400).send(`Missing parentId`);
      throw new Error("ParentId is required");
    }
    const filePath = path.join(process.cwd(), "data", "discussion.json");
    const comments: IComments[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const tree = makeTree(comments, parentId);
    res.status(200).send(tree);
  } catch (e) {
    res.status(500).send("Internal server error");
    console.log(e);
  }
};

export default comments;
