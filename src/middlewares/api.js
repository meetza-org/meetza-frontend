import { RSAA } from 'redux-api-middleware'

export default store => next => action => {
    const callApi = action[RSAA]

    // Check if this action is a redux-api-middleware action.
    if (callApi) {
      // Inject the Authorization header from localStorage.
      callApi.headers = Object.assign({}, callApi.headers, {
        Authorization: 'Bearer ' + localStorage.getItem('token') || '',
        'Content-Type': 'application/json',
      });
      callApi.endpoint = `${process.env.REACT_APP_API_URL}/${callApi.endpoint}`;
    }
  
    // Pass the FSA to the next action.
    return next(action)
  
}