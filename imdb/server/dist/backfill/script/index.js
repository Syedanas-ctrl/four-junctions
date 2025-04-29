"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backfillData = backfillData;
const db_1 = require("../../db");
const entity_1 = require("../../modules/movies/entity");
const drizzle_orm_1 = require("drizzle-orm");
const constants_1 = require("../../utils/constants");
const axios_1 = __importDefault(require("axios"));
const categories = [
    'top250-movies',
    'top-box-office',
    'most-popular-movies',
    'top-rated-english-movies',
    'lowest-rated-movies'
];
// Main backfill function
async function backfillData() {
    try {
        console.log('Starting movie backfill process...');
        for (const category of categories) {
            console.log(`Processing ${category}...`);
            const config = (0, constants_1.IMDB_API_MOVIE_BY_CATEGORY)(category);
            const response = await axios_1.default.get(config.url, { headers: config.headers });
            const moviesData = response.data;
            for (const [index, movieData] of moviesData.entries()) {
                try {
                    // Use a transaction for each movie insertion
                    await db_1.db.transaction(async (tx) => {
                        const existingMovie = await tx.select()
                            .from(entity_1.movies)
                            .where((0, drizzle_orm_1.eq)(entity_1.movies.imdbId, String(movieData.id)))
                            .limit(1);
                        if (existingMovie.length > 0) {
                            tx.update(entity_1.movies)
                                .set({
                                categories: Array.from(new Set([...(existingMovie[0].categories || []), category])),
                                updatedBy: 'backfill'
                            })
                                .where((0, drizzle_orm_1.eq)(entity_1.movies.imdbId, String(movieData.id)));
                            console.log(`Movie ${movieData.id} already exists`);
                        }
                        else {
                            const movieValues = {
                                imdbId: movieData.id,
                                url: movieData.url,
                                primaryTitle: movieData.primaryTitle,
                                originalTitle: movieData.originalTitle,
                                type: movieData.type,
                                description: movieData.description,
                                primaryImage: movieData.primaryImage,
                                contentRating: movieData.contentRating,
                                startYear: movieData.startYear,
                                endYear: movieData.endYear,
                                releaseDate: movieData.releaseDate,
                                language: movieData.language,
                                interests: movieData.interests,
                                countriesOfOrigin: movieData.countriesOfOrigin,
                                externalLinks: movieData.externalLinks,
                                spokenLanguages: movieData.spokenLanguages,
                                filmingLocations: movieData.filmingLocations,
                                budget: movieData.budget,
                                grossWorldwide: movieData.grossWorldwide,
                                genres: movieData.genres,
                                isAdult: movieData.isAdult ? 1 : 0,
                                runtimeMinutes: movieData.runtimeMinutes,
                                averageRating: movieData.averageRating, // Store as int (multiplied by 10)
                                numVotes: movieData.numVotes,
                                categories: [category],
                                createdBy: 'backfill',
                                updatedBy: 'backfill'
                            };
                            await tx.insert(entity_1.movies).values(movieValues);
                        }
                    });
                    // Log progress
                    if ((index + 1) % 10 === 0) {
                        console.log(`Processed ${index + 1}/${moviesData.length} movies from ${category}`);
                    }
                }
                catch (error) {
                    console.error(`Error processing movie ${movieData.primaryTitle}:`, error);
                    // Continue with the next movie
                }
            }
            console.log(`Completed processing ${category}`);
        }
        console.log('Movie backfill completed successfully!');
    }
    catch (error) {
        console.error('Backfill process failed:', error);
    }
}
