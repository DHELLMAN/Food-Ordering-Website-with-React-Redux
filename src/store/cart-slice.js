import { createSlice } from "@reduxjs/toolkit"

const INITIAL_CART_STATE = {
    items: [],
    totalAmount: 0,
    totalQuantity:0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_CART_STATE,
    reducers: {
        replaceCart(state,action){
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItem(state,action){

            const newItem = action.payload;
            state.totalAmount = Number((state.totalAmount + (newItem.price * newItem.amount)).toFixed(2));
            state.totalQuantity += newItem.amount;
            let existingCartItem = state.items.find((item) => item.id === newItem.id);
            if (existingCartItem) {
                existingCartItem.amount += newItem.amount;
            } else {
            state.items.push(newItem);
            }
        },
        removeItem(state,action){

            const removingItemID = action.payload; 
            let existingItem = state.items.find((item) => item.id === removingItemID);
            state.totalAmount = Number((state.totalAmount - existingItem.price).toFixed(2));
            state.totalQuantity--;
            if (existingItem.amount === 1) {
            state.items = state.items.filter(item => item.id !== removingItemID);
            } else {
                existingItem.amount--;
            }
        },
        emptyCart(state){
            state.items=[];
            state.totalAmount=0;
            state.totalQuantity=0;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;