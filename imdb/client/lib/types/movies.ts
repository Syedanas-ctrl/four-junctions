import { Actor } from "./actors";
import { Audit } from "./audit";
import { Producer } from "./producers";

export interface Movie extends Audit {
    id: number;
    imdbId: string;
    url: string;
    primaryTitle: string;
    originalTitle: string;
    type: string;
    description: string;
    primaryImage: string;
    contentRating: string;
    startYear: number;
    endYear: number;
    releaseDate: string;
    language: string;
    interests: string[];
    countriesOfOrigin: string[];
    externalLinks: string[];
    spokenLanguages: string[];
    filmingLocations: string[];
    budget: number;
    grossWorldwide: number;
    genres: string[];
    isAdult: number;
    runtimeMinutes: number;
    averageRating: number;
    numVotes: number;
    producerId: number;
    categories: MovieCategories[];
    actors: Actor[];
    producer: Producer;
  }

export enum MovieCategories {
    top250Movies = "top250-movies",
    topBoxOffice = "top-box-office",
    mostPopularMovies = "most-popular-movies",
    topRatedEnglishMovies = "top-rated-english-movies",
    lowestRatedMovies = "lowest-rated-movies",
}

export const MovieCategoriesLabels = {
    [MovieCategories.top250Movies]: "Top 250 Movies",
    [MovieCategories.topBoxOffice]: "Top Box Office",
    [MovieCategories.mostPopularMovies]: "Most Popular Movies",
    [MovieCategories.topRatedEnglishMovies]: "Top Rated English Movies",
    [MovieCategories.lowestRatedMovies]: "Lowest Rated Movies",
}