import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { Tabs } from 'antd'
import { changeTab, removeTab } from "actions/tabs";
import Home from 'pages/Home'

import styles from './TabPanes.module.less'

const { TabPane } = Tabs;

class TabPanes extends PureComponent {
	handleChange(activeKey) {
		this.props.changeTab(activeKey)
	}

	onEdit(targetKey, action) {
		this[action](targetKey);
	}

	remove(targetKey) {
		this.props.removeTab(targetKey)
	}

	render() {
		const { shownTabs, activeTab } = this.props.tabs;
		const tabPanes = Object.keys(shownTabs).map((key, index) => {
			let item = shownTabs[key];
			let title = item.menuname;
			return (
				<TabPane tab={title} key={item.Code} closable={item.Code != 'Home'}>
					<Home pointCode={item.Code} />
				</TabPane>
			)
		});
		return (
			<div>
				<Tabs hideAdd
					animated
					defaultActiveKey={activeTab}
					activeKey={activeTab}
					onChange={(key) => this.handleChange(key)}
					type="editable-card"
					onEdit={(targetKey, action) => this.onEdit(targetKey, action)}>
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
		changeTab(Code) {
			dispatch(changeTab(Code))
		},
		removeTab(Code) {
			dispatch(removeTab(Code))
		}
	}
};
TabPanes = connect(mapStateToProps, mapDispatchToProps)(TabPanes);
export default TabPanes;
