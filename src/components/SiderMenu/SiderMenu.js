import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { expandMenu, getMenu } from 'actions/menu'
import { addAllTabs, addTab, changeTab } from 'actions/tabs'
import { Menu, Icon, Spin, Affix } from 'antd'
import logo from 'images/logo.png'
import styles from './SiderMenu.less'

const SubMenu = Menu.SubMenu;

class SiderMenu extends PureComponent {
	constructor(props) {
		super(props)
		this.props.getMenu();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { allTabs } = nextProps.tabs
		if(Object.keys(allTabs).length == 1) {
			nextProps.menu.menus.forEach(menu => {
				menu.menus.forEach(sub => {
					nextProps.addAllTabs(sub)
				})
			})
		}
		return prevState
	}

	handleClick(item) {
		this.props.addTab(item)
	}

	changeTab(code) {
		this.props.changeTab(code)
	}

	render() {
		const { isExpand, isLoading, menus, errMsg } = this.props.menu;
		const MenuItems = menus ?
			menus.map((sub, index) => (
				<SubMenu key={sub.Code} title={<span><Icon type="mail"/><span>{sub.menuname}</span></span>}>
					{
						sub.menus.map((item, i) => {
							return (
								<Menu.Item key={item.Code} onClick={() => this.handleClick(item)}>
									<Link className="ellipsis" to={item.url ? item.url : '/' + item.Code}>
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
				<Affix offsertop={0}>
					<div className={`${styles["page-logo"]} ${isExpand ? 'expand' : 'collapse'}`}
					     style={isExpand ? { width: 200 } : { width: 80 }}>
						{isExpand ?
							<Link to="/" onClick={() => this.changeTab('Home')}>
								<img src={logo} alt="logo"/>
							</Link> :
							<Icon onClick={() => this.props.expandMenu()}
							      type={isExpand ? 'menu-fold' : 'menu-unfold'}
							      style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }}/>}
					</div>
				</Affix>
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
	menu: state.menu,
	tabs: state.tabs
}), (dispatch) => {
	return {
		getMenu() {
			dispatch(getMenu())
		},
		expandMenu() {
			dispatch(expandMenu())
		},
		addTab(tabData) {
			dispatch(addTab(tabData))
		},
		addAllTabs(tabData) {
			dispatch(addAllTabs(tabData))
		},
		changeTab(code) {
			dispatch(changeTab(code))
		}
	}
})(SiderMenu);
