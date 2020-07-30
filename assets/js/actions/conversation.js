import {
    GET_CONVERSATIONS,
    RECIEVE_CONVERSATIONS
} from "../constants/actionTypes";

export const requestConversations = () => ({
    type: GET_CONVERSATIONS,
});

export const receiveConversations = (json) => { return ({
    type: RECIEVE_CONVERSATIONS,
    items: json,
    receivedAt: Date.now()
})};


export const fetchConversations = () => dispatch => {
    dispatch(requestConversations());
    return fetch(`/conversations/`)
        .then(response => response.json())
        .then(json => {
            return dispatch(receiveConversations(json))
        })
};
