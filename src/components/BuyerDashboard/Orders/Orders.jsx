
import './Orders.css';

export default function ManageOrders() {
  const orders = [
    {
      id: 1,
      image: '/assets/mastercard.png',
      title: 'do geostatistics analysis with qgis, arcgis and rstudio',
      orderDate: 'Apr 13, 2024',
      dueDate: 'Apr 16, 2024',
      price: '$7.78',
    },
    {
      id: 2,
      image: '/assets/mastercard.png',
      title: 'do a species distribution map via maxent and divagis',
      orderDate: 'Apr 03, 2024',
      dueDate: 'Apr 04, 2024',
      price: '$9.89',
    },
  ];

  return (
    
    <div className='orders-container'>
    <h1 className="title">Manage Orders</h1>

      <div className="container">
      

        <div className="tabs">
          <span>ACTIVE</span>
          <span>MISSING DETAILS</span>
          <span>DELIVERED</span>
          <span className="active-tab">
            COMPLETED <span className="badge">2</span>
          </span>
          <span>
            CANCELLED <span className="badge-grey">1</span>
          </span>
          <span>
            ALL <span className="badge-grey">3</span>
          </span>
        </div>

        <div className="order-list">
          <h3>COMPLETED ORDERS</h3>

          {/* Header Row */}
          <div className="order-row" style={{ fontWeight: 'bold', color: '#666666', }}>
            <div></div>
            <div></div>
            <div></div>
            <div>ORDER DATE</div>
            <div>DUE ON</div>
            <div>TOTAL</div>
            <div>STATUS</div>
          </div>

          {orders.map((order) => (
            <div key={order.id} className="order-row">
              <img src={order.image} alt="Order" className="thumbnail" />
              <div className="order-tag">CUSTOM ORDER</div>
              <div className="order-title">{order.title}</div>
              <div className="order-date">{order.orderDate}</div>
              <div className="order-date">{order.dueDate}</div>
              <div className="order-price">{order.price}</div>
              <button className="order-btn">Order Again</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
