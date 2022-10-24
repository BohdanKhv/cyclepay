import { createSlice} from '@reduxjs/toolkit';
import utils from '../../../constants/utils';

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
        deleteSub: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        updateSub: (state, action) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item);
        },
        importSub: (state, action) => {
            state.items = action.payload;
        },
        sortSub: (state, action) => {
            if(action.payload === 'name:asc') {
                state.items = state.items.sort((a, b) => a.name.localeCompare(b.name));
            } else if (action.payload === 'name:desc') {
                state.items = state.items.sort((a, b) => b.name.localeCompare(a.name));
            } else if (action.payload === 'price:asc') {
                state.items = state.items.sort((a, b) => a.price - b.price);
            } else if (action.payload === 'price:desc') {
                state.items = state.items.sort((a, b) => b.price - a.price);
            } else if (action.payload === 'first bill date:asc') {
                state.items = state.items.sort((a, b) => new Date(a.firstBill) - new Date(b.firstBill));
            } else if (action.payload === 'first bill date:desc') {
                state.items = state.items.sort((a, b) => new Date(b.firstBill) - new Date(a.firstBill));
            } else if (action.payload === 'next bill date:asc') {
                state.items = state.items.sort((a, b) => new Date(a.nextBill) - new Date(b.nextBill));
            } else if (action.payload === 'next bill date:desc') {
                state.items = state.items.sort((a, b) => new Date(b.nextBill) - new Date(a.nextBill));
            }
        }
    }
});

export const { clearSub, addSub, updateSub, importSub, deleteSub, sortSub } = subSlice.actions;
export default subSlice.reducer;