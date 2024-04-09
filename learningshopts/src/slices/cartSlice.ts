import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartProduct, Cart } from "../validations/Types";

interface CartState {
  cart: Cart | null;
  cartProducts: CartProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: CartState = {
  cart: null,
  cartProducts: [],
  status: "idle",
  error: null,
};

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async(cartProduct: Omit<CartProduct, 'id'>, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/cart', cartProduct);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
