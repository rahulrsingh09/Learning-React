import React, { Component } from 'react';
import MyButton from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import Input from '../../../components/UI/Input/input';
import { connect } from 'react-redux';
import Loading from '../../../components/UI/Loading/Loading';
import * as orderAction from '../../../store/actions/'


class ContactData extends Component {

    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name: 'name',
                    placeholder : 'Your Name'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name : 'street',
                    placeholder : 'Your Street'
                },
                value: '',
                validation:{
                    
                },
                valid: false,
                touched: false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name : 'zip',
                    placeholder : 'ZipCode'
                },
                value: '',
                validation:{
                   required: true,
                   minLength: 6,
                   maxLength: 8
                },
                valid: false,
                touched: false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name : 'country',
                    placeholder : 'Country'
                },
                value: '',
                validation:{
                    
                },
                valid: false,
                touched: false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    name : 'email',
                    placeholder : 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {  
                  options :[
                      {value : 'fastest', displayValue : 'Fastest'},
                      {value : 'cheapest', displayValue : 'Cheapest'}
                  ]
                },
                value: 'fastest',
                validation:{
                   
                },
                valid: true,
                touched: false
            }
        },
        formValid : false
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

    orderHandler = (event) => {
        event.preventDefault();
        const customerOrder = {};
        for(let key in this.state.orderForm) {
            customerOrder[key] = this.state.orderForm[key].value;
        }
        const order = {...customerOrder, ingredients : this.props.ingredients, totalPrice : this.props.totalPrice, userId: this.props.userId };
        this.props.onOrderBurger(order, this.props.authToken); 

    }

    onInputChangeHandler = (event, elementId) => {
        console.log('onevery input');
        const updatedOrderForm = {
            ...this.state.orderForm,
            [elementId] : {
                ...this.state.orderForm[elementId],
                value : event.target.value,
                touched : true,
                valid : this.checkValidity(event.target.value, this.state.orderForm[elementId].validation)    
            }
        }
        
        let isFormValid = false;
        for(let key in updatedOrderForm){
            isFormValid = updatedOrderForm[key].valid;
            if(!isFormValid) break;
        }

        this.setState({
            orderForm : updatedOrderForm,
            formValid : isFormValid
        });
    }

    render() {
        const formArrayElements = [];
        for(let key in this.state.orderForm){
            formArrayElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }        
        let form = (
            <form onSubmit = {this.orderHandler}>
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
                <MyButton disabled = {!this.state.formValid} type = 'Success'>ORDER</MyButton>
            </form>
        )

        if(this.props.loading){
            form = <Loading />
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter you Contact Details</h4>
                    {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        userId : state.auth.localId,
        authToken : state.auth.idToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger : (orderData, authToken) => dispatch(orderAction.purchaseBurger(orderData, authToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);