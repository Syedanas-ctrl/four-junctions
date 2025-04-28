import { db } from '../../db';
import { Movie, movies } from '../../modules/movies/entity';
import { eq } from 'drizzle-orm';
import { IMDB_API_MOVIE_BY_CATEGORY } from '../../utils/constants';
import axios from 'axios';

// JSON files to import
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
      
      const config = IMDB_API_MOVIE_BY_CATEGORY(category);
      const response = await axios.get(config.url, { headers: config.headers });
      const moviesData: Movie[] = response.data;

      for (const [index, movieData] of moviesData.entries()) {
        
        try {
          // Use a transaction for each movie insertion
          await db.transaction(async (tx) => {
            const existingMovie: Movie[] = await tx.select()
              .from(movies)
              .where(eq(movies.imdbId, String(movieData.id)))
              .limit(1);

            if (existingMovie.length > 0) {
              tx.update(movies)
                .set({
                  categories: Array.from(new Set([...(existingMovie[0].categories as string[] || []), category])),
                  updatedBy: 'backfill'
                })
                .where(eq(movies.imdbId, String(movieData.id)));
              console.log(`Movie ${movieData.id} already exists`);
              return;
            }

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
              interests: movieData.interests as any,
              countriesOfOrigin: movieData.countriesOfOrigin as any,
              externalLinks: movieData.externalLinks as any,
              spokenLanguages: movieData.spokenLanguages as any,
              filmingLocations: movieData.filmingLocations as any,
              budget: movieData.budget,
              grossWorldwide: movieData.grossWorldwide,
              genres: movieData.genres as any,
              isAdult: movieData.isAdult ? 1 : 0,
              runtimeMinutes: movieData.runtimeMinutes,
              averageRating: movieData.averageRating, // Store as int (multiplied by 10)
              numVotes: movieData.numVotes,
              categories: [category],
              createdBy: 'backfill',
              updatedBy: 'backfill'
            };
            
            await tx.insert(movies).values(movieValues as any);
          });
          
          // Log progress
          if ((index + 1) % 10 === 0) {
            console.log(`Processed ${index + 1}/${moviesData.length} movies from ${category}`);
          }
        } catch (error) {
          console.error(`Error processing movie ${movieData.primaryTitle}:`, error);
          // Continue with the next movie
        }
      }
      
      console.log(`Completed processing ${category}`);
    }
    
    console.log('Movie backfill completed successfully!');
  } catch (error) {
    console.error('Backfill process failed:', error);
  }
}

// Execute the backfill function
backfillData().catch(console.error);

// Export for potential usage in other scripts
export { backfillData };
