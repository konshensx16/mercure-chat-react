import {
    GET_CONVERSATIONS, RECIEVE_CONVERSATIONS,
    GET_MESSAGES, RECIEVE_MESSAGES,
    POST_MESSAGE, ADD_MESSAGE, SET_HUBURL, SET_USERNAME,
    SET_LAST_MESSAGE
} from "../constants/actionTypes";

export default (state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    hubUrl: null,
    username: null
}, action) => {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case RECIEVE_CONVERSATIONS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.items
            };
        case GET_MESSAGES:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case RECIEVE_MESSAGES:
            const _newConversations = state.items.map((conversation) => {
                return conversation.conversationId == action.conversationId
                    ? Object.assign({}, conversation, {messages: action.messages})
                    : conversation
                    ;
            });

            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: [..._newConversations]
            };

        case ADD_MESSAGE:
            const _newItemsFinal = state.items.map(item => {
                return item.conversationId == action.conversationId
                    ?
                    (
                            Object.assign({}, item, {messages: [...item.messages, action.message]})
                    )
                    : Object.assign({}, item);
            });
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: [..._newItemsFinal]
            };
        case SET_LAST_MESSAGE:
            const _newItemsFinal2 = state.items.map(item => {
                return item.conversationId == action.conversationId
                    ?
                    (
                        item.content = action.message.content,
                        item.createdAt = action.message.createdAt,
                        Object.assign({}, item)
                    )
                    : Object.assign({}, item);
            });
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: [..._newItemsFinal2]
            };
        case SET_HUBURL:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                hubUrl: action.url
            };
        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        default:
            return state;
    }

}
