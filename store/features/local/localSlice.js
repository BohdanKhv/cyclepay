import { createSlice } from '@reduxjs/toolkit';
import { darkTheme, lightTheme } from '../../../constants/theme';

const initialState = {
    theme: lightTheme,
    sort: 'bill date',
    infoDisplay: 'monthly',
};


export const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setInfoDisplay: (state, action) => {
            state.infoDisplay = action.payload;
        }
    }
});

export const {
    setTheme,
    setSort,
    setInfoDisplay
} = localSlice.actions;
export default localSlice.reducer;