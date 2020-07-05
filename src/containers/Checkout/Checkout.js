import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect } from 'react-redux';

class Checkout extends Component{
    // state = {
    //     ingredients: {},
    //     totalPrice:0
    // }

    // componentDidMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price=0;
    //     for(let param of query.entries()){
    //         //["bacon","0"]
    //         if(param[0]==='price'){
    //             price=param[1];
    //         }
    //         else{
    //             ingredients[param[0]] = Number(param[1]);
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice:price});
    // }

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.onCheckoutCancelled}
                    checkoutContinued={this.onCheckoutContinued}
                 />
                 <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
                 {/* <Route path={this.props.match.path+'/contact-data'} render={()=>(
                     <ContactData ingredients={this.props.ings} price={this.props.price} {...this.props}/>
                 )}/> */}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};


//connect() returns hoc which takes component as an arguement

export default connect(mapStateToProps)(Checkout);