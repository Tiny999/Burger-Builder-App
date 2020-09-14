import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';



const INGREDIENT_PRICES = {
    salad: 200.50,
    bacon: 150.50,
    cheese: 150.80,
    meat: 300.50
}

class BurgerBuilder extends Component{
  state = {
    ingredients: { 
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 200,
    purchasable: false,
    buying: false,
    loading: false
  }

  updatePurchaseStatus = ingredients => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0)

    this.setState({purchasable: sum > 0 });
  }


  buyingHandler = () =>{
    this.setState({buying: true});
  }

  purchaseCancelHandler = () => {
    this.setState({buying: false});
  }

  purchaseContinuedHandler = () => {
    // Set Loading State
    this.setState({loading: true});
    
    // Grab Order Details
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      .then(response => this.setState({loading: false, buying: false}))
      .catch(err => this.setState({loading: false, buying: false}))
  }


  addIngredientHandler = (type) => {
    // Update Ingredients on burger
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
   updatedIngredients[type] = updatedCount;

   // Update Price of Burger
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = priceAddition + oldPrice;

    // Set the state
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    // Update Purchase State
    this.updatePurchaseStatus(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
   updatedIngredients[type] = updatedCount;

   // Update Price of Burger
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    // Set the state
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    // Update purchase state
    this.updatePurchaseStatus(updatedIngredients);
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = <OrderSummary 
    orderCancelled = {this.purchaseCancelHandler}
    orderContinued = {this.purchaseContinuedHandler}
    price = {this.state.totalPrice}
    ingredients={this.state.ingredients}/>

    if(this.state.loading){
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal show={this.state.buying} modalClosed = {this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls  
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered = {this.buyingHandler}
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);