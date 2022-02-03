import { combineReducers } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import seatselection from "./seatselection"

const reducers = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload
        }
    }

    return (
        combineReducers({
            seatselection,
            //다른 createslice들...
        })(state,action)
    )
}

export default reducers