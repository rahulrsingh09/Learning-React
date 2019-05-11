import React, { Component } from 'react';
import MyButton from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss'
import axios from '../../../axios.instance';
import Input from '../../../components/UI/Input/input';

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
                value: ''
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name : 'street',
                    placeholder : 'Your Street'
                },
                value: ''
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name : 'zip',
                    placeholder : 'ZipCode'
                },
                value: ''
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    name : 'country',
                    placeholder : 'Country'
                },
                value: ''
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    name : 'email',
                    placeholder : 'Your Email'
                },
                value: ''
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {  
                  options :[
                      {value : 'fastest', displayValue : 'Fastest'},
                      {value : 'cheapest', displayValue : 'Cheapest'}
                  ]
                },
                value: 'fastest'
            }
        }
    }   

    orderHandler = (event) => {
        event.preventDefault();
        const customerOrder = {};
        for(let key in this.state.orderForm) {
            customerOrder[key] = this.state.orderForm[key].value;
        }

        console.log(customerOrder);
        /*  axios.post('/order.json', order).then(res => {
            this.props.history.push('/');
        }).catch(error => {

        })  */

    }

    onInputChangeHandler = (event, elementId) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
            [elementId] : {
                ...this.state.orderForm[elementId],
                value : event.target.value    
            }
        }

        this.setState({
            orderForm : updatedOrderForm
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
                           changed = {(event) => this.onInputChangeHandler(event, element.id)}
                           />     
                ))}
                <MyButton type = 'Success'>ORDER</MyButton>
            </form>
        )

        return (
            <div className = {classes.ContactData}>
                <h4>Enter you Contact Details</h4>
                    {form}
            </div>
        );
    }
}

export default ContactData;