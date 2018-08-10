import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {Tabs, Spin} from 'antd'
import {changeTab,removeTab, getOperateList} from "actions/tabs";
import OperateList from 'components/OperateList/OperateList'
import styles from './Home.less'

class Home extends Component {
	constructor (props){
		super(props);
		this.state = {};
		const Code = props.pointCode;
		if (!props.tabs.operateLists[Code]) {
			props.getOperateList(Code)
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
		return prevState;
	}

	componentDidMount(){

	}

	render () {
		const { pointCode, tabs } = this.props;
		const operateList = tabs.operateLists[pointCode]||{data: null, isLoading:false};
		const { data, isLoading} = operateList;
		return (
			<Spin spinning={isLoading}>
				<div className={styles['home-page']}>
					<OperateList operateList={data} />
					{this.props.pointCode}
					{JSON.stringify(operateList)}
				</div>
			</Spin>
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
		},
		getOperateList(Code){
			dispatch(getOperateList(Code))
		}
	}
};
Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home