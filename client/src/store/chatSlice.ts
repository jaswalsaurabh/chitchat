import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export interface MessageEntry {
    body: string;
    chatId: string;
    chatType: string;
    createdAt: string;
    gsi1Pk: string;
    gsi1Sk: string;
    id: string;
    isDeleted: boolean;
    isEdited: boolean;
    kind: string;
    msgStatus: string;
    pk: string;
    receiver: User;
    sender: User;
    sk: string;
    sk1: string;
    sk2: string;
    type: string;
    updatedAt: string;
}

export interface User {
    name: string;
    profileImage: string;
    userName: string;
    userId: string;
    email: string;
}
interface Participant {
    // Define properties for participant object if needed
    [key: string]: User;
}
export interface RequestEntry {

}
export interface ChatEntry {
    chatDetail: User;
    chatId: string;
    chatType: string;
    createdAt: string;
    gsi1Pk: string;
    gsi1Sk: string;
    participant: Participant[]; // You may define a Participant interface for this
    pk: string;
    sk: string;
    sk1: string;
    type: string;
    updatedAt: string;
}

export interface ChatState {
    sender: User | null;
    receiver: User | null;
    currChatId: string | null;
    chatType: string | null;
    currentChat: ChatEntry | null;
    chatListLoading: boolean;
    chatHistoryLoading: boolean;
    requestListLoading: boolean;
    chatHistory: { data: MessageEntry[] | [] };
    chatList: { data: ChatEntry[] | [] };
    requestList: { data: RequestEntry[] | [] };
}

const initialState: ChatState = {
    sender: null,
    receiver: null,
    chatType: null,
    currChatId: null,
    currentChat: null,
    chatListLoading: false,
    chatHistoryLoading: false,
    requestListLoading: false,
    chatHistory: { data: [] },
    chatList: { data: [] },
    requestList: { data: [] },
};


const ChatSLice = createSlice({
    name: "ChatSlice",
    initialState,
    reducers: {
        updateState(state, action) {
            const { key, value } = action.payload
            return {
                ...state,
                [key]: value
            }
        },
        updateChatHistory(state, action) {
            return {
                ...state,
                chatHistory: action.payload
            }
        },
        addChatMessage(state, action) {
            const tempHis = { ...state.chatHistory };
            tempHis.data = [...tempHis.data, action.payload]
            return {
                ...state,
                chatHistory: tempHis
            }
        },
        updateLoadingState(state, action) {
            const { key, value } = action.payload
            return {
                ...state,
                [key]: value
            }
        },
        updateChatDetails(state, action) {
            const newState = action.payload
            return {
                ...state,
                ...newState
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

export const { updateChatHistory, updateChatDetails, addChatMessage, updateState, updateChatList, updateReqList, updateLoadingState } = ChatSLice.actions;

export default ChatSLice.reducer;



export function fetchChatList(userId: string) {
    return function chatListThunk(dispatch: Dispatch) {
        dispatch(updateLoadingState({ key: 'chatListLoading', value: true }))
        axios.post(API_ENDPOINT + '/get-chat-list', { userId }).then((res) => {
            // console.log('char List resp', res.data);
            dispatch(updateChatList(res.data))
            dispatch(updateLoadingState({ key: 'chatListLoading', value: false }))
            return res.data;
        })
            .catch((err) => {
                dispatch(updateLoadingState({ key: 'chatListLoading', value: false }))
                console.log('err in fetch chat list thunk', err);
                return err;
            })
    }
}


export const fetchChatHistory = (chatId: string) => {
    return async function chatHistoryThunk(dispatch: Dispatch) {
        dispatch(updateLoadingState({ key: 'chatHistoryLoading', value: true }))
        return axios.post(API_ENDPOINT + '/get-chat-history', { chatId }).then((res) => {
            // console.log('char history resp', res.data);
            dispatch(updateChatHistory(res.data))
            dispatch(updateLoadingState({ key: 'chatHistoryLoading', value: false }))
            return res.data;
        })
            .catch((err) => {
                dispatch(updateLoadingState({ key: 'chatHistoryLoading', value: false }))
                console.log('err in fetch chat list thunk', err);
                return err;
            })
    }
}

