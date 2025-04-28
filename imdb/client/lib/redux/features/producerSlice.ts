import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Producer } from '@/lib/types/producers';

interface ProducerState {
  producers: Producer[];
  selectedProducer: Producer | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProducerState = {
  producers: [],
  selectedProducer: null,
  status: 'idle',
  error: null
};

export const fetchProducers = createAsyncThunk('producers/fetchProducers', async () => {
  const response = await fetch('/api/producers');
  if (!response.ok) throw new Error('Failed to fetch producers');
  return response.json();
});

export const fetchProducerById = createAsyncThunk('producers/fetchProducerById', async (id: number) => {
  const response = await fetch(`/api/producers/${id}`);
  if (!response.ok) throw new Error('Failed to fetch producer');
  return response.json();
});

export const createProducer = createAsyncThunk('producers/createProducer', async (producer: Omit<Producer, 'id'>) => {
  const response = await fetch('/api/producers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producer)
  });
  if (!response.ok) throw new Error('Failed to create producer');
  return response.json();
});

export const updateProducer = createAsyncThunk('producers/updateProducer', 
  async ({ id, producer }: { id: number; producer: Partial<Producer> }) => {
    const response = await fetch(`/api/producers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producer)
    });
    if (!response.ok) throw new Error('Failed to update producer');
    return response.json();
  }
);

export const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    setSelectedProducer: (state, action: PayloadAction<Producer | null>) => {
      state.selectedProducer = action.payload;
    },
    clearProducerErrors: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Producers
      .addCase(fetchProducers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch producers';
      })
      // Fetch Producer by ID
      .addCase(fetchProducerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProducer = action.payload;
      })
      .addCase(fetchProducerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch producer';
      })
      // Create Producer
      .addCase(createProducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.producers.push(action.payload);
      })
      .addCase(createProducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create producer';
      })
      // Update Producer
      .addCase(updateProducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProducer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.producers.findIndex(producer => producer.id === action.payload.id);
        if (index !== -1) {
          state.producers[index] = action.payload;
        }
        if (state.selectedProducer?.id === action.payload.id) {
          state.selectedProducer = action.payload;
        }
      })
      .addCase(updateProducer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update producer';
      });
  }
});

// Export actions
export const { setSelectedProducer, clearProducerErrors } = producerSlice.actions;

// Selectors
export const selectAllProducers = (state: RootState) => state.producers.producers;
export const selectProducerById = (id: number) => (state: RootState) => {
  return state.producers.producers.find(producer => producer.id === id);
};
export const selectSelectedProducer = (state: RootState) => state.producers.selectedProducer;
export const selectProducerStatus = (state: RootState) => state.producers.status;
export const selectProducerError = (state: RootState) => state.producers.error;

export default producerSlice.reducer; 