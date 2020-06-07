import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: {},
        totalPrice:0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price=0;
        for(let param of query.entries()){
            //["bacon","0"]
            if(param[0]==='price'){
                price=param[1];
            }
            else{
                ingredients[param[0]] = Number(param[1]);
            }
        }
        this.setState({ingredients: ingredients, totalPrice:price});
    }

    onCheckoutCancelled = () =>{
        this.props.history.goBack();
    }

    onCheckoutContinued = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.onCheckoutCancelled}
                    checkoutContinued={this.onCheckoutContinued}
                 />
                 {/* <Route path={this.props.match.path+'/contact-data'} component={ContactData}/> */}
                 <Route path={this.props.match.path+'/contact-data'} render={()=>(
                     <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>
                 )}/>
            </div>
        );
    }
}

export default Checkout;