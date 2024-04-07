export const CALL_KIND = {
    INITIATE: "INITIATE",
    ANSWER: "ANSWER",
    DECLINED: "DECLINED",
    CANCELLED: "CANCELLED",
    RECORDING: "RECORDING",
    CANDIDATE: "CANDIDATE",
    ENDED: "ENDED",
    MUTE: "MUTE",
    UNMUTE: "UNMUTE",
    HOLD: "HOLD",
    RESUME: "RESUME",
    PAUSE_VIDEO: "PAUSE_VIDEO",
    RESUME_VIDEO: "RESUME_VIDEO",
};

export const SOCKET_ROUTE = {
    CALL: "call",
    SENT: "sent",
    MESSAGE: "message",
    RECEIVED: "received",
}

export const CALL_MODE = {
    AUDIO: "AUDIO",
    VIDEO: "VIDEO",
}

export const MESSAGE = {
    SEEN: "SEEN",
    SENT: "SENT",
    DELIVERED: "DELIVERED",
}

export const MSG_KIND = {
    TEXT: "TEXT",
    DOCUMENT: "DOCUMENT",
    IMAGE: "IMAGE",
    AUDIO: "AUDIO",
    VIDEO: "VIDEO",
}