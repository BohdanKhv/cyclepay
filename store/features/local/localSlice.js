import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { darkTheme, lightTheme } from '../../../constants/theme';
import notifee from '@notifee/react-native';

const initialState = {
    theme: lightTheme,
    sort: "name:asc",
    infoDisplay: 'monthly',
    infoNextBill: 'date',
    channelId: null,
};


export const setChannelId = createAsyncThunk(
    "local/setChannelId",
    async (data, thunkAPI) => {
        try {
            const channelId = await notifee.createChannel({
                id: 'reminder',
                name: 'Reminder',
            });
            return channelId;
        } catch (error) {
            console.log(error);
        }
    }
);


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
        },
        setInfoNextBill: (state, action) => {
            state.infoNextBill = action.payload;
        }
    }, extraReducers: (builder) => {
        builder.addCase(setChannelId.fulfilled, (state, action) => {
            state.channelId = action.payload;
        })
    }
});

export const {
    setTheme,
    setSort,
    setInfoDisplay,
    setInfoNextBill,
} = localSlice.actions;
export default localSlice.reducer;