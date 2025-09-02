import React, {useEffect, useState} from "react";
import API from "../api";

export default function PurchaseOrders(){
  const [orders,setOrders] = useState([]);
  const [vendorId,setVendorId] = useState("");
  const [total,setTotal] = useState("");

  useEffect(()=> load(), []);
  function load(){ API.get("/transactions/purchase_orders").then(r=>setOrders(r.data)).catch(()=>setOrders([])); }
  function add(){ API.post("/transactions/purchase_orders", {vendor_id: parseInt(vendorId||0), total_amount: parseFloat(total||0)}).then(()=>{setVendorId("");setTotal("");load();}); }

  return (
    <div className="card">
      <h3>Purchase Orders</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input placeholder="Vendor ID" value={vendorId} onChange={e=>setVendorId(e.target.value)} />
        <input placeholder="Total Amount" value={total} onChange={e=>setTotal(e.target.value)} />
        <button onClick={add}>Create</button>
      </div>
      <ul>
        {orders.map(o => <li key={o.id}>#{o.id} — Vendor {o.vendor_id} — ${o.total_amount} — {new Date(o.order_date).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
