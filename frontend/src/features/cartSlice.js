import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newCartItem = action.payload;
            const itemExists = state.find(item => {
                if(item._id === newCartItem._id){
                    item.quantity=newCartItem.quantity
                    return true;
                }
                return false;
            });
            if (!itemExists) {
                state.push(newCartItem); // Directly push to the state array
            }
            if(itemExists){

            }
        },
        removeFromCart: (state, action) => {
            const removeId = action.payload;
            return state.filter((item) => item._id !== removeId); // Return new state array without the item
        },
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
