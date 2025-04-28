import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Actor } from '@/lib/types/actors';
import { API_URL } from '@/lib/constants';

interface ActorState {
  actors: Actor[];
  selectedActor: Actor | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ActorState = {
  actors: [],
  selectedActor: null,
  status: 'idle',
  error: null
};

export const fetchActors = createAsyncThunk('actors/fetchActors', async () => {
  const response = await fetch(`${API_URL}/api/actors`);
  if (!response.ok) throw new Error('Failed to fetch actors');
  return response.json();
});

export const fetchActorByImdbId = createAsyncThunk('actors/fetchActorByImdbId', async (imdbId: string) => {
  const response = await fetch(`${API_URL}/api/actors/imdb/${imdbId}`);
  if (!response.ok) throw new Error('Failed to fetch actor');
  return response.json();
});

export const createActor = createAsyncThunk('actors/createActor', async (actor: Omit<Actor, 'id'>) => {
  const response = await fetch(`${API_URL}/api/actors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actor)
  });
  if (!response.ok) throw new Error('Failed to create actor');
  return response.json();
});

export const updateActor = createAsyncThunk('actors/updateActor', 
  async ({ id, actor }: { id: number; actor: Partial<Actor> }) => {
    const response = await fetch(`${API_URL}/api/actors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(actor)
    });
    if (!response.ok) throw new Error('Failed to update actor');
    return response.json();
  }
);

export const actorSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {
    setSelectedActor: (state, action: PayloadAction<Actor | null>) => {
      state.selectedActor = action.payload;
    },
    clearActorErrors: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Actors
      .addCase(fetchActors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actors = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch actors';
      })
      // Fetch Actor by ID
      .addCase(fetchActorByImdbId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActorByImdbId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedActor = action.payload;
      })
      .addCase(fetchActorByImdbId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch actor';
      })
      // Create Actor
      .addCase(createActor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createActor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.actors.push(action.payload);
      })
      .addCase(createActor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create actor';
      })
      // Update Actor
      .addCase(updateActor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateActor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.actors.findIndex(actor => actor.id === action.payload.id);
        if (index !== -1) {
          state.actors[index] = action.payload;
        }
        if (state.selectedActor?.id === action.payload.id) {
          state.selectedActor = action.payload;
        }
      })
      .addCase(updateActor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update actor';
      });
  }
});

// Export actions
export const { setSelectedActor, clearActorErrors } = actorSlice.actions;

// Selectors
export const selectAllActors = (state: RootState) => state.actors.actors;
export const selectActorById = (id: number) => (state: RootState) => {
  return state.actors.actors.find(actor => actor.id === id);
};
export const selectSelectedActor = (state: RootState) => state.actors.selectedActor;
export const selectActorStatus = (state: RootState) => state.actors.status;
export const selectActorError = (state: RootState) => state.actors.error;

// Export reducer
export default actorSlice.reducer; 