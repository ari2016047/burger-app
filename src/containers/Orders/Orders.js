import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state={
        orders: [],
        loading: true
    }

    componentDidMount = ()=> {
        axios.get('/orders.json')
            .then(response =>{
                let fetchedOrders = [];
                for(let i in response.data){
                    fetchedOrders.push({...response.data[i], id: i});
                }
                this.setState({orders:fetchedOrders ,loading: false});
                console.log(this.state);
            })
            .catch(err =>{
                this.setState({loading: false});
            }); 
    }

    render(){
        let orders = this.state.orders.map(order =>(
            <Order
             key={order.id}
             ingredients={order.ingredients}
             customer={order.customer}
             price={+order.price}
            />
        ));
        if(this.state.loading){
            orders=<Spinner />;
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
}

export default ErrorHandler(Orders,axios);