import React, { Component } from 'react';
import Aux from '../../hoc/Auxa';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// const layout = props => (
//     //wrapping root element
    // <Aux>
    //     <Toolbar />
    //     <SideDrawer/>
    //     <main className={classes.Content}>
    //         {props.children}
    //     </main>
    // </Aux>
// );

class Layout extends Component{

    state = {
        showSideDrawer: false
    }
    closeSideDrawerHandler = () =>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState) =>{
             return {showSideDrawer:!prevState.showSideDrawer};   
            });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;