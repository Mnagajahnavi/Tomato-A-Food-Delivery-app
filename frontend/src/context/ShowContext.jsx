import { StoreContext } from "./StoreContext";
import { useEffect, useState } from "react";
import axios from 'axios';

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const url = "https://tomato-a-food-delivery-app.onrender.com";
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItem){
      if(cartItem[item] > 0){
        let itemInfo = food_list.find((product)=>product._id===item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async() =>{
    const response = await axios.get(url+'/api/food/list');
    setFoodList(response.data.foods);
  }

  const loadCartDate = async(token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartDate(localStorage.getItem("token"))
      }
    }
    loadData();
  },[])
  
  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
