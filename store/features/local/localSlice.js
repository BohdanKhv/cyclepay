import { createSlice } from '@reduxjs/toolkit';
import { darkTheme, lightTheme } from '../../../constants/theme';

const initialState = {
    theme: lightTheme,
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