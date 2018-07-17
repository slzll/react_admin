import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

class Home extends Component {
    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                        <Link to=""></Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

export default Home