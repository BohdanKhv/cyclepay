import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
};


export const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = localSlice.actions;
export default localSlice.reducer;