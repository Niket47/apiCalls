import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, loginUser } from "../../services/ApiCalls";

const GET_All_PRODUCTS = "getAllProducts";
export const getAllProductsAction = createAsyncThunk(
    GET_All_PRODUCTS,
    async () => {
        try {
            const response = await getAllProducts();
            return response;
        } catch (error) {
            return error
        }
    }
);
