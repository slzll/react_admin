import React, { Component } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Tabs, Spin, Row, Col } from 'antd'
import { addTab, changeTab, removeTab, getOperateList } from "actions/tabs"
import OperateList from 'components/OperateList/OperateList'
import { post } from 'utils/fetch'
import styles from './Home.less'
import taskImg1 from 'images/index_1.png'
import taskImg2 from 'images/index_2.png'
import taskImg3 from 'images/index_3.png'
import taskImg4 from 'images/index_4.png'
import userListImg from 'images/userlist.png'
import courseListImg from 'images/courselist.png'
import articleListImg from 'images/articlelist.png'
import trainingListImg from 'images/traininglist.png'
import examListImg from 'images/examlist.png'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		const Code = props.pointCode;
		if(!props.tabs.operateLists[Code]) {
			props.getOperateList(Code)
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return prevState
	}

	componentDidMount() {

	}

	handleTab(data) {
		const { url, code, text } = data
		if(!this.props.tabs.shownTabs[code]) {
			let tabData = this.props.tabs.allTabs[code] || { Code: code, url: url, menuname: text }
			this.props.addTab(tabData)
		} else {
			this.props.changeTab(code)
		}
	}

	render() {
		const { pointCode, tabs } = this.props
		const operateList = tabs.operateLists[pointCode] || { data: null, isLoading: false }
		const { data, isLoading } = operateList
		console.log(pointCode, operateList)
		let HomeComponent = null
		switch(pointCode) {
			case "Home":

				const taskList = [
					{ url: "/user/userlist", code: "userlist", status: "UnAudited", imgSrc: taskImg1, text: "审核注册" },
					{
						url: "/training/traininguserpagelist",
						code: "TrainingUserAudit",
						status: "UnAudit",
						imgSrc: taskImg2,
						text: "培训班报名"
					},
					{
						url: "/course/commentpagelist",
						code: "messageboard",
						status: "UnAudit",
						imgSrc: taskImg3,
						text: "审核留言"
					},
					{
						url: "/course/DiscussPageList",
						code: "discuss",
						status: "UnAudit",
						imgSrc: taskImg4,
						text: "审核评论"
					}
				]
				const entryList = [
					{ url: "/user/userlist", code: "userlist", imgSrc: userListImg, text: "用户资料" },
					{ url: "/course/courselist", code: "courselist", imgSrc: courseListImg, text: "课程列表" },
					{ url: "/article/articlelist", code: "articlelist", imgSrc: articleListImg, text: "文章列表" },
					{ url: "/training/traininglist", code: "traininglist", imgSrc: trainingListImg, text: "培训列表" },
					{ url: "/exam/examlist", code: "examlist", imgSrc: examListImg, text: "考试列表" }
				]
				HomeComponent = (
					<Row gutter={20}>
						<Col span={12}>
							<div className={styles['block-container']}>
								<h2 className={styles['block-header']}>待处理的任务</h2>
								<Row type="flex" justify="space-around">
									{
										taskList.map(taskItem => {
											return (
												<Col key={taskItem.code}>
													<Link to={taskItem.url}
													      onClick={() => this.handleTab(taskItem)}>
														<img style={{filter: `hue-rotate(${Math.random()*360}deg)`}} src={taskItem.imgSrc} alt={taskItem.text}/>
														<p>{taskItem.text+"     "+0}</p>
													</Link>
												</Col>
											)
										})
									}
								</Row>
							</div>
						</Col>
						<Col span={12}>
							<div className={styles['block-container']}>
								<h2 className={styles['block-header']}>快捷入口</h2>
								<Row type="flex" justify="space-around">
									{
										entryList.map((entryItem, index) => {
											return (
												<Col className={styles['entry-link']} key={entryItem.code}><Link
													to={entryItem.url}
													onClick={() => this.handleTab(entryItem)}><img
													src={entryItem.imgSrc}/></Link></Col>
											)
										})
									}
								</Row>
							</div>
						</Col>
					</Row>
				)
				break
			default:
				break
		}

		return (
			<Spin className="home-page-spin" spinning={isLoading}>
				<div className={styles['home-page']}>
					<OperateList operateList={data}/>
					{HomeComponent}
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
		addTab(code) {
			dispatch(addTab(code))
		},
		changeTab(code) {
			dispatch(changeTab(code))
		},
		removeTab(code) {
			dispatch(removeTab(code))
		},
		getOperateList(code) {
			dispatch(getOperateList(code))
		}
	}
}
Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home