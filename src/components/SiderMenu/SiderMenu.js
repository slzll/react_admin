import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {collapseMenu, expandMenu, getMenu} from 'actions/menu'
import { Menu, Icon, Spin } from 'antd'
import logo from 'images/logo.png'
import styles from './SiderMenu.less'

const SubMenu = Menu.SubMenu;
class SiderMenu extends Component {
    constructor(props) {
        super(props)
        this.props.getMenu();
    }

    render () {
        const { isExpand, isLoading, menus, errMsg } = this.props.menu;
        const MenuItems = menus ?
            menus.map((sub, index)=>(
                <SubMenu key={sub.Code} title={<span><Icon type="mail" /><span>{sub.menuname}</span></span>}>
                    {
                        sub.menus.map((item, i) => {
                            if (item.url){
                                return (
                                    <Menu.Item key={item.Code}>
                                        <Link className="ellipsis" to={item.url}>
                                            <span title={item.menuname}>{item.menuname}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            } else {
                                return (
                                    <Menu.Item key={item.Code}>
                                        <Link className="ellipsis" to={item.Code} onClick={}>
                                            <span title={item.menuname}>{item.menuname}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                        })
                    }
                </SubMenu>
            )) : '';
        return (
            <React.Fragment>
                <div className={styles["page-logo"]}>
                    {isExpand ?
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                        </Link> :
                        <Icon onClick={()=>this.props.expandMenu()}
                            type={isExpand ?  'menu-fold':'menu-unfold'}
                            style={{color: 'white', fontSize: '18px', cursor: 'pointer'}} />}
                </div>
                <Spin spinning={isLoading}>
                    <Menu
                        mode="inline"
                        theme="dark"
                    >
                        { MenuItems }
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
        getMenu() {
            dispatch(getMenu())
        },
        expandMenu() {
            dispatch(expandMenu())
        }
    }
})(SiderMenu);
