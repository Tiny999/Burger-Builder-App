import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: ''
      }, 
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    // Set Loading State
    this.setState({loading: true});

    const formData = {};
    for( let element in this.state.orderForm){
      formData[element] = this.state.orderForm[element].value;
    }
    
    // Grab Order Details
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    // Post data to server
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(err => this.setState({loading: false}));
  }

  inputChangedHandler =( e, inputId )=> {
    const updatedOrderForm = {...this.state.orderForm}

    const updatedFromElement = {...updatedOrderForm[inputId]}

    updatedFromElement.value = e.target.value;
    updatedOrderForm[inputId] = updatedFromElement;

    this.setState({orderForm: updatedOrderForm});
  }

  render(){
    const formElementsArr = [];
    for (let key in this.state.orderForm){
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(element => (
          <Input 
            key={element.id} 
            elementType={element.config.elementType} 
            elementConfig={element.config.elementConfig} 
            value={element.config.value}
            changed={(e) => this.inputChangedHandler(e, element.id)}/>
        ))}
        <Button btnType="Success">ORDER</Button>
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