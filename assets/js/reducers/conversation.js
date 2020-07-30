import {
    GET_CONVERSATIONS, RECIEVE_CONVERSATIONS
} from "../constants/actionTypes";

export default (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
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
        default:
            return state;

    }

}
