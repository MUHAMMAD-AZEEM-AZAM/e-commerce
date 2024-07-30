import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        addToken: (state, action) => {
            return action.payload;
        }
    }
});

export const { addToken } = tokenSlice.actions;
export default tokenSlice.reducer;
