import React,{ Component } from 'react';
import { Button } from 'antd';
import styles from './OperateList.less'

class OperateList extends Component{
	render(){
		const { operateList } = this.props;
		const operateButtons = operateList && operateList.map((item, index)=>{
			if (item.operateCode == 'list'){
				return ;
			}
			return <Button className={styles['operate-list-btn']} type="primary" size='small' key={item.operateCode}>{item.operateName}</Button>
		});
		return (
			<div className={styles["operate-list-containter"]}>
				{operateButtons}
			</div>
		)
	}
}

export default OperateList;