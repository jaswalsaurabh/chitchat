import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ChatState {
    sender: object | null;
    receiver: object | null;
    currChatId: string | null;
    currentChat: object | null; // You can replace 'any' with the appropriate type for currentChat
    chatListLoading: boolean;
    chatHistoryLoading: boolean;
    requestListLoading: boolean;
    chatHistory: any[]; // You can replace 'any[]' with the appropriate type for chatHistory
    chatList: any[]; // You can replace 'any[]' with the appropriate type for chatList
    requestList: any[]; // You can replace 'any[]' with the appropriate type for requestList
}

const initialState: ChatState = {
    sender: null,
    receiver: null,
    currChatId: null,
    currentChat: null,
    chatListLoading: false,
    chatHistoryLoading: false,
    requestListLoading: false,
    chatHistory: [],
    chatList: [],
    requestList: [],
};


const ChatSLice = createSlice({
    name: "ChatSlice",
    initialState,
    reducers: {
        updateChatHistory(state, action) {
            return {
                ...state,
                chatHistory: action.payload
            }
        },
        updateLoadingState(state, action) {
            const { key, value } = action.payload
            return {
                ...state,
                [key]: value
            }
        },
        updateChatList(state, action) {
            return {
                ...state,
                chatList: action.payload
            }
        },
        updateReqList(state, action) {
            return {
                ...state,
                requestList: action.payload
            }
        },
    }
})

export const { updateChatHistory, updateChatList, updateReqList, updateLoadingState } = ChatSLice.actions;

export default ChatSLice.reducer;

export function fetchChatList(userId: string) {
    return function chatListThunk(dispatch: Dispatch) {
        dispatch(updateLoadingState({ key: 'chatListLoading', value: true }))
        axios.post(API_ENDPOINT + '/get-chat-list', { userId }).then((res) => {
            console.log('char List resp', res.data);
            dispatch(updateChatList(res.data))
            dispatch(updateLoadingState({ key: 'chatListLoading', value: false }))
        })
            .catch((err) => {
                dispatch(updateLoadingState({ key: 'chatListLoading', value: false }))
                console.log('err in fetch chat list thunk', err);
            })
    }
}

