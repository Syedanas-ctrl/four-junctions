export const IMDB_API_MOVIE_CAST = (imdbId: string) => {
    return {
        url: `https://imdb236.p.rapidapi.com/imdb/${imdbId}/cast`,
        headers: {
            'X-RapidAPI-Key': process.env.IMDB_API_KEY,
            'X-RapidAPI-Host': process.env.IMDB_API_MOVIE_CAST_HOST
        }
    }
}

export const IMDB_API_CAST_DETAILS = (castImdbId: string) => {
    return {
        url: `https://imdb-com.p.rapidapi.com/actor/get-overview?nconst=${castImdbId}`,
        headers: {
            'X-RapidAPI-Key': process.env.IMDB_API_KEY,
            'X-RapidAPI-Host': process.env.IMDB_API_CAST_DETAILS_HOST
        }
    }
}

export const IMDB_API_MOVIE_BY_CATEGORY = (category: string) => {
    return {
        url: `https://imdb236.p.rapidapi.com/imdb/${category}`,
        headers: {
            'X-RapidAPI-Key': process.env.IMDB_API_KEY,
            'X-RapidAPI-Host': process.env.IMDB_API_MOVIES_BY_CATEGORY_HOST
        }
    }
}