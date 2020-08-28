import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';



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
    buying: false
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
    this.setState({buying: true});
    alert("Thanks for Patronizing!!");
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

    return (
      <Aux>
        <Modal show={this.state.buying} modalClosed = {this.purchaseCancelHandler}>
          <OrderSummary 
          orderCancelled = {this.purchaseCancelHandler}
          orderContinued = {this.purchaseContinuedHandler}
          price = {this.state.totalPrice}
          ingredients={this.state.ingredients}/>
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

export default BurgerBuilder;