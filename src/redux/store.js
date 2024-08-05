import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';

const store = configureStore({
    reducer: {
        images: imageReducer,
    },
});

export default store;
