import type { IComments } from "../types";

type ParentId = string;

const makeTree = (comments: IComments[], parentId: ParentId = null) => {
  return comments
    .filter((comment) => comment.parentId === parentId)
    .reduce(
      (tree, comment) => [
        ...tree,
        {
          ...comment,
          children: makeTree(comments, comment.id),
        },
      ],
      []
    );
};

export default makeTree;
