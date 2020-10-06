import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      }, 
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
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
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
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
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order);
  }

  checkValidity(value, rules){
    let isValid = true;

    if(!rules){
      return true; 
    }

    if(rules.required){ 
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler =( e, inputId )=> {
    // Grab mutable state objects
    const updatedOrderForm = {...this.state.orderForm}
    const updatedFormElement = {...updatedOrderForm[inputId]}

    // update value
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let inputID in updatedOrderForm){
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }

    console.log(formIsValid)
    // setState
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
            shouldValidate={element.config.validation}
            invalid={!element.config.valid}
            touched={element.config.touched}
            changed={(e) => this.inputChangedHandler(e, element.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseOrderStart(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));