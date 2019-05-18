import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as authActions from '../../../store/actions';

class Logout extends Component {

    componentDidMount(){
        this.props.logoutUser();
    }

    render() {
        return (<Redirect to= '/'/>);
    }
}


const mapStateToProps = (state) => {
    return {
       
    }
}

const mapDispatchToToProps = (dispatch) => {
    return {
        logoutUser : () => {dispatch(authActions.logout())}
    }
}

export default connect(mapStateToProps,mapDispatchToToProps)(Logout);