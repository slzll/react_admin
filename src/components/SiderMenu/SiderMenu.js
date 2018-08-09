import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {collapseMenu, expandMenu, getMenu} from 'actions/menu'
import { addTab } from 'actions/tabs'
import {Menu, Icon, Spin} from 'antd'
import logo from 'images/logo.png'
import styles from './SiderMenu.less'
import {post} from 'utils/fetch.js'

const SubMenu = Menu.SubMenu;

class SiderMenu extends Component {
	constructor (props) {
		super(props)
		this.props.getMenu();
	}

	handleClick (item) {
		console.log(item)
		this.props.addTab(item)
	}

	render () {
		const {isExpand, isLoading, menus, errMsg} = this.props.menu;
		const MenuItems = menus ?
			menus.map((sub, index) => (
				<SubMenu key={sub.Code} title={<span><Icon type="mail"/><span>{sub.menuname}</span></span>}>
					{
						sub.menus.map((item, i) => {
							return (
								<Menu.Item key={item.Code} onClick={() => this.handleClick(item)}>
									<Link className="ellipsis" to={item.url ? item.url : '/'+item.Code}>
										<span title={item.menuname}>{item.menuname}</span>
									</Link>
								</Menu.Item>
							)
						})
					}
				</SubMenu>
			)) : '';
		return (
			<React.Fragment>
				<div className={styles[ "page-logo" ]}>
					{isExpand ?
						<Link to="/">
							<img src={logo} alt="logo"/>
						</Link> :
						<Icon onClick={() => this.props.expandMenu()}
						      type={isExpand ? 'menu-fold' : 'menu-unfold'}
						      style={{color: 'white', fontSize: '18px', cursor: 'pointer'}}/>}
				</div>
				<Spin spinning={isLoading}>
					<Menu mode="inline" theme="dark">
						{MenuItems}
					</Menu>
				</Spin>
			</React.Fragment>
		);
	}
}

export default connect((state) => ({
	menu: state.menu
}), (dispatch) => {
	return {
		getMenu () {
			dispatch(getMenu())
		},
		expandMenu () {
			dispatch(expandMenu())
		},
		addTab (tabData){
			dispatch(addTab(tabData))
		}
	}
})(SiderMenu);
