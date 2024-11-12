import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import postSlice from "./post/postSlice";
import usersSlice from "./features/users/usersSlice";
import dialogSlice from "./features/dialog/dialogSlice";
import messageSlice from "./features/messages/messageSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        dialog: dialogSlice,
        message: messageSlice,
        user: usersSlice,
    },
});
