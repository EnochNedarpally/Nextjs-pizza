import { createSlice} from '@reduxjs/toolkit'

    const cartSlice= createSlice({
        name:'cart',
        initialState:{
            products:[],
            total:0,
            cartQuantity:0
        },
        reducers:{
            addProduct:(state,action)=>{
                state.products.push(action.payload);
                state.total += action.payload.price * action.payload.quantity;
                state.cartQuantity+=1
            },
            reset:(state)=>{
                // state=initialState
                state.products=[];
                state.total =0;
                state.cartQuantity=0;
            }
        }
    });

    export const {addProduct,reset} = cartSlice.actions;
    export default cartSlice.reducer;