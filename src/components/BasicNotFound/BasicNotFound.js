import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import scssStyle from './BasicNotFound.scss';

export default class BasicNotFound extends Component {
  render() {
    return (
      <div className="basic-not-found">
        <IceContainer>
          <div style={styles.exceptionContent} className={scssStyle["exception-content"]}>
            <img
              src={require('./images/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png')}
              style={styles.image}
              className={scssStyle["imgException"]}
              alt="页面不存在"
            />
            <div className="prompt">
              <h3 style={styles.title} className={scssStyle["title"]}>
                抱歉，你访问的页面不存在
              </h3>
              <p style={styles.description} className={scssStyle["description"]}>
                您要找的页面没有找到，请返回<a href="#">首页</a>继续浏览
              </p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
};
