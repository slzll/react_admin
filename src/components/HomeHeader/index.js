import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button, Icon } from 'antd'
import { getUserInfo, login } from "actions/user";
import { greetingText } from "utils"

import styles from './HomeHeader.module.less'

class HomeHeader extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { user, login, getUserInfo } = this.props
    if (user.isLogin) {
      getUserInfo();
    } else {
      login({ account: 'zll', password: '123456' })
    }
  }

  render() {
    let welcomeTime = greetingText();
    const { userInfo } = this.props.user;
    return (
      <div className={styles.header}>
        {
          userInfo.Model ? <h4>{welcomeTime}{userInfo.Model.Name}，欢迎来到后台管理系统</h4> : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login(data) {
      dispatch(login(data))
    },
    getUserInfo() {
      dispatch(getUserInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
