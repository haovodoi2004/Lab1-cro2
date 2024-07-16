import { configureStore } from "@reduxjs/toolkit";
import QLChiTieu from "../reducers/QLChiTieu";

export default configureStore({
    reducer: {
        listThuChi: QLChiTieu
    }
});

