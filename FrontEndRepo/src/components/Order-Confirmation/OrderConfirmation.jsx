import "./OrderConfirmation.css";
import { Link } from "react-router-dom";
export default function OrderConfirmation({
  selectedPayment,
  myDetails,
  total,
  myProducts,
  setMyproducts,
  order,
  setOrder,
}) {


  return (
    <div className="order-confirmation-container">
      <h1 className="order-confirmed-header">YOUR ORDER HAS BEEN CONFIRMED!</h1>
      <h2 className="confirm-number">Your order confirmation number is : #{order.order_id}</h2>
      <h3 className="confirm-details">Your total today was: ${order.total}</h3>
      <h3 className="confirm-details">Shipping address: {order.shipping_address}</h3>
      <h2 className="confirm-number">Items ordered:</h2>
      <div className="confirmed-items-container">
        {order.product_id.map((e) => {
          return (
            <div key={e.id} className="individual-confirmed-items">
              <h3 className="confirmed-items">
                {e.name} <br/>${e.price}(ea)
              </h3>
            </div>
          );
        })}
      </div>
      <Link to='/'><button className="confirmation-button">Return Home</button></Link>
    </div>
  );
}
