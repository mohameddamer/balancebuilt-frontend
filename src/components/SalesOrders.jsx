import React,{useEffect,useState} from 'react';
import { safeGet } from '../api';
export default function SalesOrders(){
  const [orders,setOrders]=useState([]);
  const [form,setForm]=useState({customer_name:'',product_id:'',quantity:1,unit_price:0,total_amount:0});
  useEffect(()=> safeGet('/transactions/sales_orders','sales_orders').then(setOrders),[]);
  function add(){ const o={...form,id:Date.now(),order_date:new Date().toISOString(),status:'New'}; setOrders(prev=>[o].concat(prev)); setForm({customer_name:'',product_id:'',quantity:1,unit_price:0,total_amount:0}); }
  return (
    <div className="card">
      <h3>Sales Orders</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        <input className="input" placeholder="Customer" value={form.customer_name} onChange={e=>setForm({...form,customer_name:e.target.value})}/>
        <input className="input" placeholder="Product ID" value={form.product_id} onChange={e=>setForm({...form,product_id:e.target.value})}/>
        <input className="input" type="number" placeholder="Qty" value={form.quantity} onChange={e=>setForm({...form,quantity:parseFloat(e.target.value||0)})}/>
        <button className="btn" onClick={add}>Create Order</button>
      </div>
      <table className="table"><thead><tr><th>ID</th><th>Customer</th><th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th><th>Order Date</th><th>Status</th></tr></thead>
      <tbody>{orders.map(o=> <tr key={o.id}><td>{o.id}</td><td>{o.customer_name}</td><td>{o.product_id}</td><td>{o.quantity}</td><td>{o.unit_price}</td><td>{o.total_amount}</td><td>{new Date(o.order_date).toLocaleDateString()}</td><td>{o.status}</td></tr>)}</tbody></table>
    </div>
  );
}
