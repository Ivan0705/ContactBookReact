import {ADD_CONTACT, DELETE_CONTACT} from "./actionType";

const initialState = {
    allContacts: [],
};
const ContactReducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_CONTACT:
                return {
                    ...state, allContacts: [...state.allContacts, action.payload]
                };
            case DELETE_CONTACT:
                return {
                    ...state,
                    allContacts: state.allContacts.filter((contact) => contact.key !== action.payload)
                };
            default: {
                return state;
            }
        }
    }
;
export default ContactReducer;