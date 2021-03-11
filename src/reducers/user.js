import USER from '../action_types/user';

const token = localStorage.getItem('token');
const userData = localStorage.getItem('userData');

const initialState = {
    isUserLoggedIn: (token === null || token === undefined) ? false : true,
    userEmailId: userData && JSON.parse(userData).email,
    firstName: userData && JSON.parse(userData).firstName,
}

const user = (state = initialState, action) => {
    switch(action.type){
        case USER.LOGIN.SUCCESS: 
            return {
                ...state,
                isUserLoggedIn: true,
                userEmailId: action.payload.email,
                firstName: action.payload.firstName,
            }
        case USER.LOGOUT.SUCCESS:{
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            return {
                ...state,
                isUserLoggedIn: false,
            }
        }
        default:{
            return state;
        }
    }
}

export default user;