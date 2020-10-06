import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAIL,
    error: error
  }
}

export const purchaseOrderStart = orderData => {
  return dispatch => {
    // Post data to server
    axios.post('/orders.json', orderData)
    .then(response => {
      console.log(response.data)
      dispatch(purchaseBurgerSuccess(response.data, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error));
    });
  }
}