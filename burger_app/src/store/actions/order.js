import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
}; // this is a thunk
export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart()); // dispatch start action
        axios
            .post('/orders.json?auth=' + token, orderData) // post data user to Firebase
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData)); // dispatch success action
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    };
}; // end of purchaseBurger

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const queryParams =
            '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; //orderBy user id to get orders by user have userId equal to userId
        axios
            .get(`/orders.json` + queryParams)
            .then((response) => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch((error) => {
                dispatch(fetchOrdersFail(error));
            });
    };
};
