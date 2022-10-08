import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: [],
};


export const subSlice = createSlice({
    name: 'sub',
    initialState,
    reducers: {
        clearSub: (state) => {
            state.items = [];
        },
        addSub: (state, action) => {
            state.items.push(action.payload);
        },
        removeSub: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        updateSub: (state, action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        }
    }
});

export const { addSub, editSub, deleteSub } = subSlice.actions;
export default subSlice.reducer;