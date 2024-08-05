import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentBirdImage: null,
    currentMapImage: null,
};

const imageSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setCurrentBirdImage: (state, action) => {
            state.currentBirdImage = action.payload;
        },
        setCurrentMapImage: (state, action) => {
            state.currentMapImage = action.payload;
        },
    },
});

export const { setCurrentBirdImage, setCurrentMapImage } = imageSlice.actions;
export default imageSlice.reducer;
