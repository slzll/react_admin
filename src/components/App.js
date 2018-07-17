import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader'
import { Layout, Tabs } from 'antd';
import {collapseMenu, expandMenu} from "actions/menu";
import MyRoute from 'router'
import HomeHeader from 'components/HomeHeader/HomeHeader'
import SiderMenu from 'components/SiderMenu/SiderMenu'

const { Header, Sider, Content, Footer } = Layout;
const { TabPane } = Tabs;
class App extends PureComponent {
    constructor(props) {
        super(props)
    }
    toggleExpanded() {
        if (this.props.menu.isExpand) {
            this.props.collapseMenu()
        } else {
            this.props.expandMenu()
        }
    }
    render() {
        const headerStyle = {
            padding: '0 0'
        };
        const { isExpand, panes } = this.props.menu;
        console.log(this.props.menu)
        const tabPanes = panes.map((pane,index) => {
            return (
                <TabPane tab={pane.title} key={pane.key}>
                    <MyRoute/>
                </TabPane>
            )
        })
        return (
            <div>
                <Layout>
                    <Sider
                        collapsible
                        collapsed = {!isExpand}
                        onCollapse = {()=>this.toggleExpanded()}
                    >
                        <SiderMenu/>
                    </Sider>
                    <Layout>
                        <Header className="page-header" style={ headerStyle }>
                            <HomeHeader/>
                        </Header>
                        <Content>
                            <Tabs defaultActiveKey="0" size="small">
                                {tabPanes}
                            </Tabs>
                        </Content>
                        <Footer>
                            Footer
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        expandMenu() {
            dispatch(expandMenu())
        },
        collapseMenu() {
            dispatch(collapseMenu())
        }
    }
}
App = connect(mapStateToProps, mapDispatchToProps)(App)
export default hot(module)(App)
