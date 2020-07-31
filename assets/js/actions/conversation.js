import {
    GET_CONVERSATIONS,
    RECIEVE_CONVERSATIONS,
    GET_MESSAGES,
    RECIEVE_MESSAGES,
    ADD_MESSAGE,
    POST_MESSAGE
} from "../constants/actionTypes";

export const requestConversations = () => ({
    type: GET_CONVERSATIONS,
});

export const receiveConversations = (json) => {
    return ({
        type: RECIEVE_CONVERSATIONS,
        items: json,
    })
};

export const requestMessages = (id) => ({
    type: GET_MESSAGES,
    conversationId: id
});

export const receiveMessages = (json, id) => {
    return ({
        type: RECIEVE_MESSAGES,
        messages: json,
        conversationId: id
    });
};

export const postMessage = (json, id) => {
    return {
        type: ADD_MESSAGE,
        message: json,
        conversationId: id
    }
};

export const fetchConversations = () => dispatch => {
    dispatch(requestConversations());
    return fetch(`/conversations/`)
        .then(response => {
            // TODO: set the HUB URL right here
            return response.json()
        })
        .then(json => {
            return dispatch(receiveConversations(json))
        })
};

export const fetchMessages = (id) => dispatch => {
    dispatch(requestMessages(id));
    return fetch(`/messages/${id}`)
        .then(response => response.json())
        .then(json => {
            return dispatch(receiveMessages(json, id))
        })
};


export const addMessage = (content, conversationId) => dispatch => {
    let formData = new FormData();
    formData.append('content', content);
    return fetch(`/messages/${conversationId}`, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(json => {
            return dispatch(postMessage(json, conversationId))
        })
};