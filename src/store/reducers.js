import { combineReducers } from 'redux'
import counter from 'reducers/counter';
import user from 'reducers/user';
import tabs from 'reducers/tabs';
import menu from 'reducers/menu';
import table from 'reducers/table'

export default combineReducers({
	counter,
	user,
	menu,
	tabs,
	table
});
