import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 3,
    cheese: 1.5,
    meat: 4
}

class BurgerBuilder extends Component{
  state = {
    ingredients: { 
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 10
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
  }

  removeIngredientHandler = (type) => {
    
  }

  render(){
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls  
          ingredientAdded={this.addIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;