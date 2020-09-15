export interface MovieFromServer {
  Type: string;
  Poster: string;
  Title: string;
  imdbID: string;
  Year: string;
}

export interface MovieWithDetails {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Plot: string;
  Poster: string;
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer:string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: string;
}