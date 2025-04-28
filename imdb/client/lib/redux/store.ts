import { configureStore } from '@reduxjs/toolkit';

import actorReducer from './features/actorSlice';
import movieReducer from './features/movieSlice';
import producerReducer from './features/producerSlice';

export const store = configureStore({
  reducer: {
    actors: actorReducer,
    movies: movieReducer,
    producers: producerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 