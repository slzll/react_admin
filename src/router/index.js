import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import LoadableComponent from './LoadableComponent'

const Home = LoadableComponent(() => import ("pages/Home/Home"));
const TablePage = LoadableComponent(() => import ("pages/TablePage/TablePage"));


class MyRoute extends PureComponent{
    render() {
        const { menus } = this.props.menu;
        const menuRoutes = menus && menus.reduce((result, sub) => {
            sub.menus.forEach(item => {
                result.push(
                    <Route key={item.Code} path={item.url} component={TablePage}/>
                )
            })
            return result
        }, []);
        return (
            <div>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    {menuRoutes}
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

export default connect(mapStateToProps)(MyRoute)
