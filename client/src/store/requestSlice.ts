import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { User } from "./chatSlice";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export interface UserEntry {
    createdAt: string;
    presenceStatus: string;
    updatedAt: string;
    userDetails: User;
    userId: string;
};

export interface RequestState {
    userList: { data: UserEntry[] } | null,
    pendingRequests: object | null,
    requestLoading: boolean,
    userLoading: boolean,
    showRequest: boolean,
    showUserList: boolean,
}


const initialState: RequestState = {
    pendingRequests: { data: [] },
    userList: { data: [] },
    requestLoading: false,
    userLoading: false,
    showRequest: false,
    showUserList: false
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

export const fetchUserList = () => {
    return function userListThunk(dispatch: Dispatch) {
        dispatch(updateState({ key: "userLoading", value: true }))
        dispatch(updateState({ key: "showUserList", value: true }))
        return axios.get(API_ENDPOINT + '/listUsers').then((res) => {
            console.log('res of list users in thunk', res.data);
            dispatch(updateState({ key: "userLoading", value: false }))
            dispatch(updateState({ key: "userList", value: res.data }))
            return res.data;
        })
            .catch((err) => {
                console.log('err in userList thunk', err);
                dispatch(updateState({ key: "userLoading", value: false }))
                return err
            })
    }
}

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