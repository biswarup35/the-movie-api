interface IMovie {
  id: number;
  show_id: string;
  title: string;
  poster: string;
  synopsis: string;
  meta: {
    label: string;
    value: string;
  }[];
  cast: {
    name: string;
    role: string;
    image: string;
  }[];
  photos: string[];
}

export default IMovie;
