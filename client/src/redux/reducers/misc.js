import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAdmin : false,
    loader : true,
}

const miscSlice = createSlice({
    name : 'misc',
    initialState,
    reducers : {
       
    }
})

export default miscSlice;

export const { } = miscSlice.actions
