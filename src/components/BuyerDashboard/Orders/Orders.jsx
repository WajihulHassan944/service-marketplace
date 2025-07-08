'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import './Orders.css';
import { baseUrl } from '@/const';
export default function ManageOrders() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user?._id && user?.currentDashboard) {
      fetch(`${baseUrl}/orders/user/${user._id}/${user.currentDashboard}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrders(data.orders);
          }
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user]);

  const handleClick = (orderId) => {
    router.push(`/order-details?id=${orderId}`);
  };

  // Filtered list based on tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return order.status === 'in progress' || order.status === 'pending';
    return order.status === activeTab;
  });

  const statusCounts = {
    all: orders.length,
    active: orders.filter(o => o.status === 'in progress' || o.status === 'pending').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className='orders-container'>
      <h1 className="title">Manage Orders</h1>

      <div className="container">
      <div className="tabs">
  {['all', 'active', 'delivered', 'completed', 'cancelled'].map((status) => (
    <span
      key={status}
      className={activeTab === status ? 'active-tab' : ''}
      onClick={() => setActiveTab(status)}
      style={{ cursor: 'pointer' }}
    >
      {status.toUpperCase()}
      {statusCounts[status] > 0 && (
        <span className={status === 'completed' ? 'badge' : 'badge-grey'}>
          {statusCounts[status]}
        </span>
      )}
    </span>
  ))}
</div>


        <div className="order-list">
          <h3>{activeTab.toUpperCase()} ORDERS</h3>

          {/* Header Row */}
          <div className="order-row" style={{ fontWeight: 'bold', color: '#666666' }}>
            <div></div>
            <div></div>
            <div></div>
            <div>ORDER DATE</div>
            <div>DUE ON</div>
            <div>TOTAL</div>
            <div>STATUS</div>
          </div>

          {filteredOrders.length === 0 ? (
            <div  style={{ textAlign: 'left', padding: '1rem',paddingLeft:'0', color: '#999' }}>
              No orders found for this status.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order._id} className="order-row" onClick={() => handleClick(order._id)} style={{ cursor: 'pointer' }}>
                <img
                  src={order.gigId?.images?.[0]?.url || '/assets/mastercard.png'}
                  alt="Order"
                  className="thumbnail"
                />
                <div className="order-tag">{order.packageType?.toUpperCase()} PACKAGE</div>
                <div className="order-title-in-orders">{order.gigId?.gigTitle || 'Untitled Gig'}</div>
                <div className="order-date">{new Date(order.createdAt).toLocaleDateString()}</div>
                <div className="order-date">{new Date(order.deliveryDueDate).toLocaleDateString()}</div>
                <div className="order-price">${order.totalAmount}</div>
                <div className="order-status">{order.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
