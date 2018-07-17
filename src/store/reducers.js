import {combineReducers} from 'redux'
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import menu from 'reducers/menu';
export default combineReducers({
    counter,
    userInfo,
    menu
});
