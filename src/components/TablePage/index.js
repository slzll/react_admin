import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Table, Button, Spin } from 'antd'
import { API_URL_ADMIN, post } from "utils";
import { getTableList } from "actions/table";
import OperateList from 'components/OperateList'


class TablePage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      columns: [],
      dataSource: []
    }
  }

  getTableData(option = {}, columns) {
    const { table, pointCode } = this.props
    const path = table.tableData[pointCode] || null
    if (path) {
      let pathSplit = path.split(','),
        url = pathSplit[0];
      post(`${API_URL_ADMIN + url}`, option)
        .then(res => {
          const { data } = res.data;
          const dataSource = data.map(item => {
            const obj = { key: item.Id };
            columns.forEach(column => {
              obj[column.key] = item[column.key]
            })
            return obj;
          })
          this.setState({
            dataSource
          })
        })
    }
  }

  getColumns() {
    const { pointCode, table } = this.props
    const rows = table.rowsData[pointCode]
    const columns = []
    rows && rows.forEach(rowsItem => {
      if (rowsItem.ShowLevel == 2) {
        columns.push({
          align: 'center',
          title: rowsItem.Name,
          dataIndex: rowsItem.Code,
          key: rowsItem.Code,
          sorter: rowsItem.SortFlag,
          width: 120,
          render: text => {
            switch (rowsItem.NameA) {
              case 'customebutton':
                return <Button type="danger">{rowsItem.Name}</Button>;
              default:
                return text;
            }
          }
        })
      }
    })
    this.setState({ columns })
  }

  componentWillMount() {
    this.getColumns();
  }

  componentDidMount() {

  }

  render() {
    const { columns, dataSource } = this.state
    const { pointCode, tabs } = this.props
    return (
      <div className="table_page">
        <OperateList pointCode={pointCode}/>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1620, y: 400 }}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tabs: state.tabs,
    table: state.table
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTableList(payload) {
      dispatch(getTableList(payload))
    }
  }
}
TablePage = connect(mapStateToProps, mapDispatchToProps)(TablePage)
export default TablePage;
