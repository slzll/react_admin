import { addTab, changeTab, removeTab } from "actions/tabs";
import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { connect } from "react-redux";
import { post } from 'utils/fetch'
import { API_URL_ADMIN } from "utils";
import styles from './MainPage.module.less'
import taskImg1 from 'images/index_1.png'
import taskImg2 from 'images/index_2.png'
import taskImg3 from 'images/index_3.png'
import taskImg4 from 'images/index_4.png'
import userListImg from 'images/userlist.png'
import courseListImg from 'images/courselist.png'
import articleListImg from 'images/articlelist.png'
import trainingListImg from 'images/traininglist.png'
import examListImg from 'images/examlist.png'


class MainPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // 待处理任务
      taskList: [
        {
          url: "/user/userlist",
          code: "userlist",
          status: "UnAudited",
          imgSrc: taskImg1,
          text: "审核注册",
          val: 0
        },
        {
          url: "/training/traininguserpagelist",
          code: "TrainingUserAudit",
          status: "UnAudit",
          imgSrc: taskImg2,
          text: "培训班报名",
          val: 0
        },
        {
          url: "/course/commentpagelist",
          code: "messageboard",
          status: "UnAudit",
          imgSrc: taskImg3,
          text: "审核留言",
          val: 0
        },
        {
          url: "/course/DiscussPageList",
          code: "discuss",
          status: "UnAudit",
          imgSrc: taskImg4,
          text: "审核评论",
          val: 0
        }
      ],
      // 快捷入口
      entryList: [
        { url: "/user/userlist", code: "userlist", imgSrc: userListImg, text: "用户资料" },
        { url: "/course/courselist", code: "courselist", imgSrc: courseListImg, text: "课程列表" },
        { url: "/article/articlelist", code: "articlelist", imgSrc: articleListImg, text: "文章列表" },
        { url: "/training/traininglist", code: "traininglist", imgSrc: trainingListImg, text: "培训列表" },
        { url: "/exam/examlist", code: "examlist", imgSrc: examListImg, text: "考试列表" }
      ]
    }
  }

  componentDidMount() {
    // 请求待处理任务数据
    post(`${API_URL_ADMIN}/Summary/GetTodo`)
      .then((res) => {
        const { Data } = res;
        if (Data) {
          const { CommentMessageAudit, DiscussMessageAudit, TrainingUserAuditCount, UserAuditCount } = Data;
          let { taskList } = this.state;
          taskList = taskList.map(taskItem => {
            switch (taskItem.code) {
              case 'userlist':
                taskItem.val = UserAuditCount;
                break;
              case 'TrainingUserAudit':
                taskItem.val = TrainingUserAuditCount;
                break;
              case 'messageboard':
                taskItem.val = CommentMessageAudit;
                break;
              case 'discuss':
                taskItem.val = DiscussMessageAudit;
                break;
              default:
                break;
            }
            return taskItem
          })
          this.setState({
            taskList
          })
        }
      })
  }

  handleTab(data) {
    const { url, code, text } = data
    if (!this.props.tabs.shownTabs[code]) {
      let tabData = this.props.tabs.allTabs[code] || { Code: code, url: url, menuname: text }
      this.props.addTab(tabData)
    } else {
      this.props.changeTab(code)
    }
  }

  render() {
    const { taskList, entryList } = this.state
    return (
      <Row gutter={20}>
        <Col span={12}>
          <div className={styles['block-container']}>
            <h2 className={styles['block-header']}>待处理的任务</h2>
            <Row type="flex" justify="space-around">
              {
                taskList.map(taskItem => {
                  return (
                    <Col key={taskItem.code} onClick={() => this.handleTab(taskItem)}>
                      <img style={{ filter: `hue-rotate(${Math.random() * 360}deg)` }}
                           src={taskItem.imgSrc} alt={taskItem.text}/>
                      <p>{taskItem.text + "     " + taskItem.val}</p>
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
                    <Col className={styles['entry-link']} key={entryItem.code}
                         onClick={() => this.handleTab(entryItem)}>
                      <img style={{ filter: `hue-rotate(${Math.random() * 360}deg)` }}
                           src={entryItem.imgSrc}/>
                    </Col>
                  )
                })
              }
            </Row>
          </div>
        </Col>
      </Row>
    )
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
    }
  }
}
MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default MainPage
