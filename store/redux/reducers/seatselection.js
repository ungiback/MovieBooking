import { createSlice } from "@reduxjs/toolkit"


const seatSelection = createSlice({
    name: "seatSelection",
    initialState: {
        cnt: 1,
        seatid: [],
        justdepsforEffect: true
    },
    reducers: {
        setCnt: (state, action) => {
            return { ...state, cnt: action.payload, justdepsforEffect: !state.justdepsforEffect, seatid: [] }
        },
        addSeatid: (state, action) => {
            if (state.cnt >= 1) {
                return { ...state, seatid: [...state.seatid, action.payload] }
            }
        },
        removeSeatid: (state, action) => {
            return { ...state, seatid: [...state.seatid].filter(item => item !== action.payload) }
        },
        stateReset: (state, action) => {
            return { ...state, cnt: action.payload, seatid: [] }
        }
    },
})

export const { setCnt, addSeatid, removeSeatid, stateReset } = seatSelection.actions
export default seatSelection.reducer