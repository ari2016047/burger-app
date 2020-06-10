import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched: false
            },
            email: {
                elememtType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postal: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elememtType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'fastest',
                validation: {},
                valid: true
            }
            },        
        loading: false,
        formIsValid: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading: true});

        let formData = {};
        for(let i in this.state.orderForm){
            formData[i] = this.state.orderForm[i].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json',order)
            .then(response =>{
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/orders');
            })
            .catch(err=>{
                this.setState({loading: false});
            });

    }
    checkvalidity = (value, rules)=>{
        let isValid = false;
        if(rules.required){
            isValid = value.trim()!==''
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value; 
        updatedFormElement.valid = this.checkvalidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let i in updatedOrderForm){
            formIsValid = updatedOrderForm[i].valid && formIsValid ;
        }
        console.log('value=',formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    
    render(){
        let formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key]
                }
            );
        }
        let formData=(
            <form>
                {formElementArray.map(formElem =>(
                    <Input 
                    key={formElem.id}
                    elementType={formElem.config.elememtType} 
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    changed={(event) => this.inputChangedHandler(event,formElem.id)}
                    invalid={!formElem.config.valid}
                    shouldValidate={formElem.config.validation}
                    touched={formElem.config.touched}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid} >Order</Button>
            </form>
        );
        if(this.state.loading){
            formData = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Data</h4>
                {formData}
            </div>
        );
    }
}

export default ContactData;