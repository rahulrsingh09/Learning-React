import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as authActions from '../../store/actions';
import Input from '../../components/UI/Input/input';
import Loading from '../../components/UI/Loading/Loading';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';

class Auth extends Component {
    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    name: 'email',
                    placeholder : 'email address'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    name : 'password',
                    placeholder : 'password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formValid : false,
        isSignUp: true,
    }

    checkValidity(value, rules){
        let isValid = true;

        if(!rules){
            return isValid;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    onInputChangeHandler = (event, elementId) => {
        const updatedOrderForm = {
            ...this.state.controls,
            [elementId] : {
                ...this.state.controls[elementId],
                value : event.target.value,
                touched : true,
                valid : this.checkValidity(event.target.value, this.state.controls[elementId].validation)    
            }
        }
        
        let isFormValid = false;
        for(let key in updatedOrderForm){
            isFormValid = updatedOrderForm[key].valid;
            if(!isFormValid) break;
        }

        this.setState({
            controls : updatedOrderForm,
            formValid : isFormValid
        });
    }

    authHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () =>{
        this.setState((prevState) => { return {isSignUp: !prevState.isSignUp}});
    }

    componentDidMount() {
        if(!this.props.isBurgerBuild && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    render() {
        const formArrayElements = [];
        for(let key in this.state.controls){
            formArrayElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        
        let form = (
            <form onSubmit = {this.authHandler}>
                {formArrayElements.map(element => ( 
                    <Input key = {element.id}
                            elementType = {element.config.elementType} 
                            elementConfig = {element.config.elementConfig}
                            value = {element.config.value}
                            inValid = {!element.config.valid}
                            touched = {element.config.touched}
                            changed = {(event) => this.onInputChangeHandler(event, element.id)}
                            />     
                ))}
                {this.state.isSignUp ? 
                <Button disabled = {!this.state.formValid} type = "Success">Signup</Button> : 
                <Button disabled = {!this.state.formValid} type = "Success">Signin</Button>}
            </form>
        )

        if(this.props.loading){
            form = <Loading show = {this.props.loading}/>
        }

        return (
            <div className = {classes.Auth}>
                 { this.props.isAuthenticated ? <Redirect to = {this.props.authRedirectPath} /> : null }
                <span>{this.props.error}</span>
               {form}
               <Button type = "Danger" clicked = {this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.idToken != null,
        isBurgerBuild : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToToProps = (dispatch) => {
    return {
       onAuth : (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
       onSetAuthRedirectPath : (path) => {dispatch(authActions.setAuthRedirectPath(path))}
    }
}

export default connect(mapStateToProps,mapDispatchToToProps)(Auth);
