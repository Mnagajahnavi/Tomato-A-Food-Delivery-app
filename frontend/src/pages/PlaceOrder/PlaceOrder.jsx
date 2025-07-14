import React, { useContext, useEffect }  from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItem,url } = useContext(StoreContext);

  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }
  }, [token]);

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItem[item._id]) {
        const itemInfo = { ...item };
        itemInfo.quantity = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const razorpayOrder = response.data.order;
        const options = {
          key: "rzp_test_pWyJxe1HjSj9xU", // ✅ Replace with your Razorpay key
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "My Food Store",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: function () {
            window.location.href = response.data.frontendRedirect.success;
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#F37254",
          },
          modal: {
            ondismiss: function () {
              window.location.href = response.data.frontendRedirect.cancel;
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        // Optional: listen for failure
        rzp.on('payment.failed', function (response) {
          alert("Payment failed: " + response.error.description);
        });
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong");
    }
  };


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${(getTotalCartAmount()===0?(0):(2)).toFixed(2)}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${(getTotalCartAmount() + (getTotalCartAmount()===0?(0):(2))).toFixed(2)}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
