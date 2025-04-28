"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.backfillData = backfillData;
const db_1 = require("../../db");
const entity_1 = require("../../modules/movies/entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// JSON files to import
const jsonFiles = [
    // 'box-office-us.json',
    '250.json',
    'popular.json',
    'top-rated.json',
    'low-rated.json'
];
// Main backfill function
async function backfillData() {
    try {
        console.log('Starting movie backfill process...');
        // Process each JSON file
        for (const file of jsonFiles) {
            console.log(`Processing ${file}...`);
            // Read and parse the JSON file
            const filePath = path.join(__dirname, '../json', file);
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const moviesData = JSON.parse(rawData);
            // Process each movie with a transaction
            for (const [index, movieData] of moviesData.entries()) {
                // Create fake producer data if not provided
                // if (!movieData.producer) {
                //   movieData.producer = {
                //     fullName: `Producer of ${movieData.primaryTitle}`,
                //     job: 'producer',
                //   };
                // }
                // // Create fake actors if not provided (at least 2)
                // if (!movieData.actors || movieData.actors.length === 0) {
                //   movieData.actors = [
                //     {
                //       fullName: `Lead Actor in ${movieData.primaryTitle}`,
                //       job: 'actor',
                //       role: 'Lead'
                //     },
                //     {
                //       fullName: `Supporting Actor in ${movieData.primaryTitle}`,
                //       job: 'actor',
                //       role: 'Supporting'
                //     }
                //   ];
                // }
                try {
                    // Use a transaction for each movie insertion
                    await db_1.db.transaction(async (tx) => {
                        // 1. Create or find producer
                        // let producerId: number;
                        // const existingProducer = await tx.select({ id: producers.id })
                        //   .from(producers)
                        //   .where(eq(producers.imdbId, movieData.producer!.imdbId!))
                        //   .limit(1);
                        // if (existingProducer.length > 0) {
                        //   producerId = existingProducer[0].id;
                        // } else {
                        //     const value = {
                        //         imdbId: movieData.producer!.imdbId,
                        //         fullName: movieData.producer!.fullName,
                        //         job: movieData.producer!.job || 'producer',
                        //         createdBy: 'backfill',
                        //         updatedBy: 'backfill'
                        //       }
                        //   const insertResult = await tx.insert(producers).values(value);
                        //   // Access insertId from the first array element
                        //   producerId = Number(insertResult[0].insertId);
                        // }
                        // 2. Insert movie
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
                            categories: [file],
                            createdBy: 'backfill',
                            updatedBy: 'backfill'
                        };
                        const movieInsertResult = await tx.insert(entity_1.movies).values(movieValues);
                        // Access insertId from the first array element
                        const movieId = Number(movieInsertResult[0].insertId);
                        // 3. Create actors and movie-actor relationships
                        // for (const actorData of movieData.actors!) {
                        //   // Check if actor exists
                        //   let actorId: number;
                        //   const existingActor = await tx.select({ id: actors.id })
                        //     .from(actors)
                        //     .where(eq(actors.imdbId, actorData.imdbId!))
                        //     .limit(1);
                        //   if (existingActor.length > 0) {
                        //     actorId = existingActor[0].id;
                        //   } else {
                        //     // Insert new actor
                        //     const actorInsertResult = await tx.insert(actors).values({
                        //       imdbId: actorData.imdbId,
                        //       fullName: actorData.fullName,
                        //       job: actorData.job || 'actor',
                        //       createdBy: 'backfill',
                        //       updatedBy: 'backfill'
                        //     });
                        //     // Access insertId from the first array element
                        //     actorId = Number(actorInsertResult[0].insertId);
                        //   }
                        //   // Create relationship
                        //   await tx.insert(movieActors).values({
                        //     movieId: movieId,
                        //     actorId: actorId,
                        //     role: actorData.role,
                        //     createdBy: 'backfill',
                        //     updatedBy: 'backfill'
                        //   });
                        // }
                    });
                    // Log progress
                    if ((index + 1) % 10 === 0) {
                        console.log(`Processed ${index + 1}/${moviesData.length} movies from ${file}`);
                    }
                }
                catch (error) {
                    console.error(`Error processing movie ${movieData.primaryTitle}:`, error);
                    // Continue with the next movie
                }
            }
            console.log(`Completed processing ${file}`);
        }
        console.log('Movie backfill completed successfully!');
    }
    catch (error) {
        console.error('Backfill process failed:', error);
    }
}
// Execute the backfill function
backfillData().catch(console.error);
