import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader'
import { Layout, Affix } from 'antd';
import { collapseMenu, expandMenu } from "actions/menu";
import MyRoute from 'router'
import HomeHeader from 'components/HomeHeader/HomeHeader'
import SiderMenu from 'components/SiderMenu/SiderMenu'

const { Header, Sider, Content, Footer } = Layout;

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
		const { isExpand } = this.props.menu;

		return (
			<div>
				<Layout>
					<Sider
						collapsible
						collapsed={!isExpand}
						onCollapse={() => this.toggleExpanded()}
					>
						<SiderMenu />
					</Sider>
					<Layout>
						<Affix offsetTop={0}>
							<Header className="page-header" style={headerStyle}>
								<HomeHeader />
							</Header>
						</Affix>
						<Content>
							<MyRoute />
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
