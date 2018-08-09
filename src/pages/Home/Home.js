import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {Tabs} from 'antd'
import {changeTab,removeTab} from "actions/tabs";

const {TabPane} = Tabs;

class Home extends Component {
	handleChange (activeKey) {
		this.props.changeTab(activeKey)
	}

	onEdit(targetKey, action){
		this[action](targetKey);
	}

	remove(targetKey){
		this.props.removeTab(targetKey)
	}

	render () {
		const {shownTabs, activeTab} = this.props.tabs;
		const tabPanes = Object.keys(shownTabs).map((key, index) => {
			let item = shownTabs[ key ];
			let title = <Link to={item.url ? item.url : '/' + item.Code}>{item.menuname}</Link>
			return (
				<TabPane tab={title} key={item.Code} closable={item.Code != 'Home'}>
					{item.menuname}
				</TabPane>
			)
		});
		return (
			<div>
				<Tabs hideAdd
					  defaultActiveKey={activeTab}
				      activeKey={activeTab}
				      onChange={(key) => this.handleChange(key)}
				      type="editable-card"
				      onEdit={(targetKey, action)=>this.onEdit(targetKey, action)}>
					{tabPanes}
				</Tabs>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tabs: state.tabs
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeTab (Code) {
			dispatch(changeTab(Code))
		},
		removeTab (Code) {
			dispatch(removeTab(Code))
		}
	}
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home