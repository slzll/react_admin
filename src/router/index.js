import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import LoadableComponent from './LoadableComponent'

const TabPanes = LoadableComponent(() => import("components/TabPanes"));
const BasicNotFound = LoadableComponent(() => import("components/BasicNotFound"));

class MyRoute extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState;
  }

  render() {
    const { menus } = this.props.menu;
    /*const menuRoutes = menus && menus.reduce((result, sub) => {
      sub.menus.forEach(item => {
        result.push(
          <Route key={item.Code} path={item.url ? item.url : '/' + item.Code} component={TabPanes} />
        )
      });
      return result
    }, []);*/
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={TabPanes}/>
          {/*{menuRoutes}*/}
          <Route path="*" component={BasicNotFound}/>
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
