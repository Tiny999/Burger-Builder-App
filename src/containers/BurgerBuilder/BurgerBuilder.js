import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
  state = {
    purchasable: false,
    buying: false,
    loading: false,
    error: null
  }

  // componentDidMount(){
  //   axios.get('https://react-burger-builder-2576f.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       this.setState({ingredients: response.data})
  //     })
  //     .catch(err => this.setState({error: true}))
  // }

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
    const queryParams = [];

    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    };

    queryParams.push(`price= ${this.state.totalPrice}`);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  render(){
    const disabledInfo = {
      ...this.props.ings
    }

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Problem Loading Ingredients</p> : <Spinner/>

    if(this.props.ings){
      burger = (
        <Aux style={{margin: '0', padding: '0'}}>
          <Burger ingredients={this.props.ings}/>
          <BuildControls  
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered = {this.buyingHandler}
            price={this.props.price}/>
        </Aux>
        );
        orderSummary = <OrderSummary orderCancelled = {this.purchaseCancelHandler} orderContinued = {this.purchaseContinuedHandler} price = {this.props.price} ingredients={this.props.ings}/>
    }

    if(this.state.loading){
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal show={this.state.buying} modalClosed = {this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
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
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));