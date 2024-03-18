import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
    requestLoading: false,
    pendingRequests: { data: [] },
    showRequest: false
}

const RequestSlice = createSlice({
    name: "RequestSlice",
    initialState,
    reducers: {
        updateRequests(state, action) {
            return {
                ...state,
                pendingRequests: action.payload
            }
        },
        updateState(state, action) {
            const { key, value } = action.payload
            return {
                ...state,
                [key]: value
            }
        },
    }
})

export const { updateRequests, updateState } = RequestSlice.actions

export default RequestSlice.reducer


export const getRequests = (userId: string) => {
    return function requestsThunk(dispatch: Dispatch) {
        dispatch(updateState({ key: "requestLoading", value: true }))
        dispatch(updateState({ key: "showRequest", value: true }))
        return axios.post(API_ENDPOINT + '/fetch-requests', { userId }).then((res) => {
            console.log('requests thunk', res.data);
            dispatch(updateState({ key: "requestLoading", value: false }))
            dispatch(updateRequests(res.data))
            return res.data;
        })
            .catch((err) => {
                dispatch(updateState({ key: "requestLoading", value: false }))
                console.log('err in requests thunk ', err);
                return err;
            })
    }
}