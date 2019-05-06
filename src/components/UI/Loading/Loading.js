import React from 'react';

import classes from './loading.module.scss';

const Loading = (props) => {
    let showLoading = null;
    if(props.show){
        showLoading = [classes.Loading];
    } else {
        showLoading = [classes.Hide]
    }
    return (
        <div className={showLoading.join(' ')}>Loading...</div>
    );
};

export default Loading;