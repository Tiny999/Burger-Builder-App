import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    // Set Loading State
    this.setState({loading: true});
    
    // Grab Order Details
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Abbas Salami",
        address: "The woo!",
        zipCode: "Nigeria"
      },
      email: "test@test.com",
      deliveryMethod: "SuperFast"
    };

    // Post data to server
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: false}));
  }

  render(){
    let form = (
      <form>
        <input type="text" name="name" placeholder="Enter Your Name"/>
        <input type="email" name="email" placeholder="Enter Your Email"/>
        <input type="text" name="street" placeholder="Street"/>
        <input type="text" name="postal" placeholder="Postal"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading){
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;