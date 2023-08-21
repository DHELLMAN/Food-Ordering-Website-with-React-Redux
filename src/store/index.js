import cartSliceReducers from "./cart-slice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {cart:cartSliceReducers}
})

export default store;