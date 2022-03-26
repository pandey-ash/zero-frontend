import axios from 'axios';
import { FIRSTNAME_CHANGED,
    LASTNAME_CHANGED, GETTING_DETAILS_FROM_API, ZIPCODE_CHANGED, ZIPCODE_DETAIL_SUCCESSFULL, ZIPCODE_DETAIL_FAIL
} from '../utils/constant';
import { BASE_URL, ZIPCODE_DETAIL_URL } from '../utils/endpointUrl';

export const firstNameChanged = (text) => {
    return {type: FIRSTNAME_CHANGED, payload: text}
}

export const lastNameChanged = (text) => {
    return {type: LASTNAME_CHANGED, payload: text}
}

export const zipcodeChanged = (text) => {
    return {type: ZIPCODE_CHANGED, payload: text}
}

export const gettingZipcodeDetails = (firstName, lastName, zipcode) => (dispatch) => {

    if(!firstName || !firstName.trim()){
        dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'First Name cannot be empty' });
        return;
    }
    else if(!lastName || !lastName.trim()){
        dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'Last Name cannot be empty' });
        return;
    }else if(!zipcode || !zipcode.trim()){
        dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'Zipcode cannot be empty' });
        return;
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    zipcode = zipcode.trim();

    if(!/^[A-z]{1,10}$/.test(firstName)){
        dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'Invalid first name' });
        return;
    }
    else if(!/^[A-z]{1,10}$/.test(lastName)){
        dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'Invalid last name' });
        return;
    }
    else if(!/^[0-9]{5}$/.test(zipcode)){
        dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'Invalid zipcode' });
        return;
    }

    dispatch({ type: GETTING_DETAILS_FROM_API });

    var config = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        url: BASE_URL + ZIPCODE_DETAIL_URL,
        data: {
            zipcode, first_name: firstName, last_name: lastName
        }
    };
    axios(config)
    .then(function(response){
        console.log(response);
        console.log(response.data);
        dispatch({ type: ZIPCODE_DETAIL_SUCCESSFULL, payload: response.data });
    })
    .catch(function(error){
        console.log('fail');
        console.log(error)
        if(!error.response)
            dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: 'Server unavailable  ' });
        else
            dispatch({ type: ZIPCODE_DETAIL_FAIL, payload: error.response.data });
    })
}
