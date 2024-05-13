import React, { createContext, useEffect, useState } from "react";
// import { createContext } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
const getDefaultCart = ()=>{
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
}

  const [all_product,setProducts] = useState([]);

  const [cartItems, setCartItems] = useState(getDefaultCart());
  
  useEffect(() => {
    fetch('http://localhost:1000/allproducts') 
          .then((res) => res.json()) 
          .then((data) => setProducts(data))
          if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:1000/getcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setCartItems(data)});
    }

}, [])
const addToCart = (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  if(localStorage.getItem("auth-token"))
  {
    fetch('http://localhost:1000/addtocart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"itemId":itemId}),
    })
    .then((resp) => resp.json())
    .then((data) => { console.log(data); })
    .catch((error) => { console.error('Error adding item to cart:', error); });
  }
};


const removeFromCart = (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  if(localStorage.getItem("auth-token"))
  {
    fetch('http://localhost:1000/removefromcart', {
    method: 'POST',
    headers: {
      Accept:'application/form-data',
      'auth-token':`${localStorage.getItem("auth-token")}`,
      'Content-Type':'application/json',
    },
    body: JSON.stringify({"itemId":itemId}),
  }) 
    .then((resp) => resp.json())
    .then((data) => {console.log(data)});
  }
};
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems)
    {
      if (cartItems[item]>0)
      {
        let itemInfo = all_product.find((product)=>product.id===Number(item))
        totalAmount += itemInfo.new_price*cartItems[item];
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () =>{
    let totalItem =0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        totalItem+= cartItems[item];
      }
    }
    return totalItem;
  }
  
  const contextValue = {getTotalCartAmount,getTotalCartItems,all_product,cartItems,addToCart,removeFromCart};


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
