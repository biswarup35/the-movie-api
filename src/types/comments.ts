interface IComments {
  id: string;
  parentId: string;
  content: {
    text: string;
    user: string;
  };
}

export default IComments;
