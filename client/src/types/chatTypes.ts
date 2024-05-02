import { User } from "@/store/chatSlice";


// Define interface for the data object
export interface Acknowledgement {
    chatId: string;
    messageId: string;
    msgStatus: string; // Assuming msgStatus can be any string value
    receiver: User;
}