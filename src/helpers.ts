import { MovieFromServer } from "./interfaces";

export const fetchData = async (title: string) => {
  const response = await fetch(`https://www.omdbapi.com/?apikey=51c92afd&s=${title}`);
  const data = await response.json();
  return data.Search
};

export const fetchMovie = async (id: string) => {
  const response = await fetch(`https://www.omdbapi.com/?apikey=51c92afd&i=${id}`);
  const data = await response.json();
  return data
};

export const sortList = (list: MovieFromServer[], sortOption: string, order: string) => {
  let temporaryList = list;
  switch (sortOption) {
    case 'title':
      temporaryList = temporaryList.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case 'year':
      temporaryList = temporaryList.sort((a, b) => {
        return +a.Year.split('–')[0] - +b.Year.split('–')[0];
      });
      break;
  }
  return order === 'reverse' ? temporaryList.reverse() : temporaryList;
}