import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件
const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
// eslint-disable-next-line
export default (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading,
  });
};
