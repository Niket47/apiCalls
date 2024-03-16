import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    language: "en"
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, actions) => {
            state.language = actions.payload
        },
    },
})

export const { changeLanguage } = languageSlice.actions

export default languageSlice.reducer