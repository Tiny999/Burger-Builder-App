import React,{ Component } from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

  render () {

    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>
      )
    })
    
    return(
      <Aux>
        <h3>Your Order</h3>
        <p>A Delicious Burger With The Following Ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
    <p><strong>Price: N{this.props.price.toFixed(2)}</strong></p>
        <p>Continue To Checkout?</p>
        <Button btnType={'Danger'} clicked={this.props.orderCancelled}>CANCEL</Button>
        <Button btnType={'Success'} clicked={this.props.orderContinued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary;