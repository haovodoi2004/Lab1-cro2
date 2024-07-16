import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listThuChi: [],
    tongThu: 0,
    tongChi: 0,
};

const soTienSlice = createSlice({
    name: 'soTien',
    initialState,
    reducers: {
        addSoTien(state, action) {
            state.listThuChi.push(action.payload);
            if (action.payload.type === 'Thu') {
                state.tongThu += action.payload.amount;
            } else {
                state.tongChi += action.payload.amount;
            }
        },
        updateSoTien(state, action) {
            const index = state.listThuChi.findIndex(soTien => soTien.id === action.payload.id);
            if (index !== -1) {
                const oldAmount = state.listThuChi[index].amount;
                const oldType = state.listThuChi[index].type;
                state.listThuChi[index] = action.payload;

                if (oldType === 'Thu') {
                    state.tongThu -= oldAmount;
                } else {
                    state.tongChi -= oldAmount;
                }

                if (action.payload.type === 'Thu') {
                    state.tongThu += action.payload.amount;
                } else {
                    state.tongChi += action.payload.amount;
                }
            }
        },
        deleteSoTien(state, action) {
            const index = state.listThuChi.findIndex(soTien => soTien.id === action.payload);
            if (index !== -1) {
                const oldAmount = state.listThuChi[index].amount;
                const oldType = state.listThuChi[index].type;

                if (oldType === 'Thu') {
                    state.tongThu -= oldAmount;
                } else {
                    state.tongChi -= oldAmount;
                }
                state.listThuChi.splice(index, 1);
            }
        }
    }
});

export const { addSoTien, updateSoTien, deleteSoTien } = soTienSlice.actions;
export default soTienSlice.reducer;
