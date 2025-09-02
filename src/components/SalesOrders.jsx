import React, {useEffect, useState} from "react";
import API from "../api";

export default function SalesOrders(){
  const [orders,setOrders] = useState([]);
  const [customerId,setCustomerId] = useState("");
  const [total,setTotal] = useState("");

  useEffect(()=> load(), []);
  function load(){ API.get("/transactions/sales_orders").then(r=>setOrders(r.data)).catch(()=>setOrders([])); }
  function add(){ API.post("/transactions/sales_orders", {customer_id: parseInt(customerId||0), total_amount: parseFloat(total||0)}).then(()=>{setCustomerId("");setTotal("");load();}); }

  return (
    <div className="card">
      <h3>Sales Orders</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input placeholder="Customer ID" value={customerId} onChange={e=>setCustomerId(e.target.value)} />
        <input placeholder="Total Amount" value={total} onChange={e=>setTotal(e.target.value)} />
        <button onClick={add}>Create</button>
      </div>
      <ul>
        {orders.map(o => <li key={o.id}>#{o.id} — Cust {o.customer_id} — ${o.total_amount} — {new Date(o.order_date).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
