import React, { PureComponent } from 'react'
import { connect } from "react-redux"
import { Spin } from 'antd'
import { getOperateList } from "actions/tabs"
import styles from './Home.module.less'
import MainPage from 'components/MainPage'
import TablePage from "components/TablePage";

class Home extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
		const Code = this.props.pointCode;
		if(!this.props.tabs.operateLists[Code]) {
			this.props.getOperateList(Code)
		}
	}

	componentDidMount() {

	}

	render() {
		const { pointCode, tabs } = this.props
		let HomeComponent = null
		switch(pointCode) {
			case "Home":
				HomeComponent = <MainPage/>
				break
			default:
				HomeComponent = <TablePage pointCode={pointCode}/>
				break
		}

		return (
			<div className={styles['home-page']}>
				{HomeComponent}
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
		getOperateList(code) {
			dispatch(getOperateList(code))
		}
	}
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home
