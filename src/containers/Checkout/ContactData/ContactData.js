import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/form/Input';


class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    name:'name',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elememtType: 'input',
                elementConfig: {
                    type: 'email',
                    name:'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    name:'street',
                    placeholder: 'street'
                },
                value: ''
            },
            postal: {
                elememtType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'postal',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            deliveryMethod:{
                elememtType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''   
            }
            },        
        loading: false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Arihant Jain',
                address: 'Begusarai',
                email: 'arihant263@gmail.com'
            },
            deliveryMethod: 'fastest'
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
            <form >
                {formElementArray.map(formElem =>(
                    <Input 
                    key={formElem.id}
                    elememtType={formElem.config.elememtType} 
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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