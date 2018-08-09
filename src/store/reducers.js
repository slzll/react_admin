import {combineReducers} from 'redux'
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import tabs from 'reducers/tabs';
import menu from 'reducers/menu';

export default combineReducers({
	counter,
	userInfo,
	menu,
	tabs
});
