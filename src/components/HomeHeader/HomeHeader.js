import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Icon } from 'antd'
import { getUserInfo } from "actions/userInfo";

import styles from './HomeHeader.less'

class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.props.getUserInfo()
    }
    render() {
        let welcomeTime;
        const { userInfo } = this.props.userInfo;
        const hour = new Date().getHours();
        if (0 <= hour && hour <= 6) {
            welcomeTime = "凌晨好！";
        } else if (7 <= hour && hour <= 11) {
            welcomeTime = "早上好！";
        } else if (hour == 12) {
            welcomeTime = "中午好！";
        } else if (13 <= hour && hour <= 17) {
            welcomeTime = "下午好！";
        } else if (hour == 18) {
            welcomeTime = "傍晚好！";
        } else if (19 <= hour && hour <= 24) {
            welcomeTime = "晚上好！";
        }
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
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo() {
            dispatch(getUserInfo())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
