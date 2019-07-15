import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';
import { API_URL_ADMIN, post } from "utils";
import { addRowsData, addTablePath } from "actions/table";
import styles from './OperateList.module.less'

class OperateList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      operateButtons: null
    }
  }

  getOperateButtons() {
    const { pointCode, tabs } = this.props;
    const operateList = tabs.operateLists[pointCode] || { data: null, isLoading: false }
    const { data, isLoading } = operateList
    const operateButtons = data && data.map((item, index) => {
      if (item.operateCode === 'list') {
        console.log(111);
        let path = item.Path;
        const obj = {};
        obj[pointCode] = path
        this.props.addTablePath(obj)
        return;
      }
      return <Button className={styles['operate-list-btn']} type="primary" size='small'
                     key={item.operateCode}>{item.operateName}</Button>
    });
    this.setState({
      operateButtons
    })
  }

  getRowsData() {
    const { pointCode, table } = this.props;
    const rows = table.rowsData[pointCode] || null;
    if (!rows) {
      post(`${API_URL_ADMIN}/Right/RolePointFieldList?pointCode=${pointCode}`)
        .then(res => {
          const obj = {};
          obj[pointCode] = res.data.rows;
          this.props.addRowsData(obj)
        })
    }
  }

  componentWillMount() {
    this.getRowsData();
    this.getOperateButtons();
  }

  render() {
    const { operateButtons } = this.state

    return (
      <div className={styles["operate-list-containter"]}>
        {operateButtons}
      </div>
    )
  }
}


export default connect((state) => ({ tabs: state.tabs, table: state.table }), (dispatch) => {
  return {
    addTablePath(tableData) {
      dispatch(addTablePath(tableData))
    },
    addRowsData(rowsData) {
      dispatch(addRowsData(rowsData))
    }
  }
})(OperateList);
