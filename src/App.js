import "./App.css"; 
import { createContext,useState,useEffect} from "react";
 import{ useReducer,useContext} from "react"
import List from "./Components/List";



const data = [
  {
    id: 1,
    title: "Shirt",
    price: 500,
  },
  {
    id: 2,
    title: "Pant ",
    price: 700,
    
  },
  {
    id: 3,
    title: "Rider gloves",
    price: 2000
    
  },
  {
    id: 4,
    title: "Sleeves",
    price: 500
    
  },
  {
    id: 5,
    title:"Boot",
    price: 695
  }
];


const actionContext = createContext();


function Qty({ quantity, id }) {
 
  const {action } = useContext(actionContext);
  return (
    <div className="plus-btn">
      <button
        onClick={function () {
          action({ type: "INCREASE_QTY", id });
        }}
      >
        +
      </button>
      {quantity}
      <button
        onClick={function () {
          if (quantity === 1) {
            action({ type: "REMOVE_FROM_CART", id });
          } else {
          }
          action({ type: "DECREASE_QTY", id });
        }}
      >
        -
      </button>
    </div>
  );
}

let AddToCartBtn = function ({ inCart, id }) {
  
  const { action } = useContext(actionContext);
  return (
    <button
      onClick={function () {
        if (inCart) {
          action({ type: "REMOVE_FROM_CART", id });
        } else {
          action({ type: "ADD_TO_ACART", id });
        }
      }}
    >
      {inCart ? "Remove" : "Add"}
    </button>
  );
};
function TimeIt({ children}) {
  let render = children();
  return render;
}

function Product({ product, inCart }) {
  const { title, price, id, qty } = product;
  let quantity = qty ? qty : 1;
  return (
    <div className="Main">
      <p>{title}</p>
      {inCart ? <Qty id={id} quantity={quantity} /> : <p>{quantity}</p>}
      <p>{price}Rs</p>
      <TimeIt name="addToAddACart">
        {() => <AddToCartBtn id={id} xyz={[]} inCart={inCart} />}
      </TimeIt>
    </div>
  );
}

export default function App() {

  const [state, action] = useReducer(List, {
    products: [],
    cart: []
  });
  const { products, cart } = state;

  useEffect(function () {
    async function todo() {
      action({ type: "POPULATE_PRODUCTS", result: data });
    }
    todo();
  }, []);

  return (
    <actionContext.Provider value={{ action}}>
      <h1>Add to Cart Function clone</h1>
      <h3>Avalable products to shop</h3>
      {
         products.map((el) => {
            return <Product action={action} key={el.id} product={el} />;
          })
      }

      <h3>MY Shopping Cart</h3>
      {cart.map((el) => {
        return <Product key={el.id} product={el} inCart={el.inCart} />;
      })}
    </actionContext.Provider>
  );
}
