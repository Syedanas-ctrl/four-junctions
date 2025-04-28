"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMDB_API_CAST_DETAILS = exports.IMDB_API_MOVIE_CAST = void 0;
const IMDB_API_MOVIE_CAST = (imdbId) => {
    return {
        url: `https://imdb236.p.rapidapi.com/imdb/${imdbId}/cast`,
        headers: {
            'X-RapidAPI-Key': process.env.IMDB_API_MOVIE_CAST_KEY,
            'X-RapidAPI-Host': process.env.IMDB_API_MOVIE_CAST_HOST
        }
    };
};
exports.IMDB_API_MOVIE_CAST = IMDB_API_MOVIE_CAST;
const IMDB_API_CAST_DETAILS = (castImdbId) => {
    return {
        url: `https://imdb-com.p.rapidapi.com/actor/get-overview?nconst=${castImdbId}`,
        headers: {
            'X-RapidAPI-Key': process.env.IMDB_API_CAST_DETAILS_KEY,
            'X-RapidAPI-Host': process.env.IMDB_API_CAST_DETAILS_HOST
        }
    };
};
exports.IMDB_API_CAST_DETAILS = IMDB_API_CAST_DETAILS;
