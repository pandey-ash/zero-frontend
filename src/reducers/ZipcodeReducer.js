import { FIRSTNAME_CHANGED,
    LASTNAME_CHANGED, GETTING_DETAILS_FROM_API, ZIPCODE_CHANGED, ZIPCODE_DETAIL_SUCCESSFULL, ZIPCODE_DETAIL_FAIL,
} from '../utils/constant';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    zipcode: '',
    error: '',
    isLoading: false,
    processedString: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=INITIAL_STATE, action) => {
    const payload = action.payload;
    switch(action.type) {
        case FIRSTNAME_CHANGED: 
            return { ...state, error: '', processedString: '', firstName: payload};
        case LASTNAME_CHANGED: 
            return { ...state, error: '', processedString: '', lastName: payload};
        case ZIPCODE_CHANGED: 
            return { ...state, error: '', processedString: '', zipcode: payload};
        case GETTING_DETAILS_FROM_API: 
            return { ...state, isLoading: true};
        case ZIPCODE_DETAIL_SUCCESSFULL: 
            return { ...state, isLoading: false, error: '', processedString: payload};
        case ZIPCODE_DETAIL_FAIL: 
            return { ...state, isLoading: false, error: payload, processedString: ''};

        default:
            return state;
    }
};
