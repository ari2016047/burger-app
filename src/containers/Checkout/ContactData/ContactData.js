import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
                this.props.history.push('/');
            })
            .catch(err=>{
                this.setState({loading: false});
            });

    }
    render(){
        let formData=(
            <form className={classes.FormDta}>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
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