import React from "react";

function List(state, action) {
    if (action.type === "ADD_TO_ACART") {
      return {...state,cart: [...state.cart,{inCart: true,qty: 1,
        ...state.products.find((el) => el.id === action.id)
          }
        ]
      };
    } else if (action.type === "REMOVE_FROM_CART") {
      if (state.products.find((el) => el.id === action.id)) {
        return {...state,cart: state.cart.filter((el) => el.id !== action.id)
        };
      }
      return {
        products: [...state.products,state.cart.find((el) => el.id === action.id)],
        cart: state.cart.filter((el) => el.id !== action.id)
      };
    } else if (action.type === "POPULATE_PRODUCTS") {
      return {
        ...state,
        products: action.result
      };
    } else if (action.type === "DECREASE_QTY") {
      return {
        ...state,cart: state.cart.map((el) => {
          if (el.id === action.id) {
            return { ...el, qty: el.qty - 1 };
          }
          return el;
        })
      };
    } else if (action.type === "INCREASE_QTY") {
      return {
        ...state,cart: state.cart.map((el) => {
          if (el.id === action.id) {
            return { ...el, qty: el.qty + 1 };
          }
          return el;
        })
      };
    } else {
      return state;
    }
  }
  
  export default List;
  