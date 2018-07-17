import React, {Component} from 'react';
import Loadable from 'react-loadable'

const LoadableComponet = function (component) {
  return Loadable({
    loader: component,
    loading: () => (
      <div>Loading ......</div>
    )
  })
}

export default LoadableComponet
