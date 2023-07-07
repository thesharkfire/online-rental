
        // create a slice to manage the items state
        import { createSlice } from '@reduxjs/toolkit';

        const workoutsSlice = createSlice({
          name: 'workouts',
          initialState: null,
          reducers: {
            setWorkouts: (state, action) => {
                  return action.payload;
             },
            createWorkout: (state, action) => {
              state.push(action.payload);
            },

            deleteWorkout: (state, action) => {
              return state.filter((w) => w._id !== action.payload);
          }
          }
        });
        
        export const { createWorkout, setWorkouts,deleteWorkout } = workoutsSlice.actions;
        export default workoutsSlice.reducer;