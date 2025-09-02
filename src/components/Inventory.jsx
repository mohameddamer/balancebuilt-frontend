import React,{useEffect,useState} from 'react';
import { safeGet } from '../api';
export default function Inventory(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({product_id:'',warehouse_id:'',quantity:0});
  useEffect(()=> safeGet('/transactions/inventory','inventory').then(setItems),[]);
  function add(){ const it={...form,id:Date.now(),last_updated:new Date().toISOString()}; setItems(prev=>[it].concat(prev)); setForm({product_id:'',warehouse_id:'',quantity:0}); }
  return (
    <div className="card">
      <h3>Inventory</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        <input className="input" placeholder="Product ID" value={form.product_id} onChange={e=>setForm({...form,product_id:e.target.value})}/>
        <input className="input" placeholder="Warehouse ID" value={form.warehouse_id} onChange={e=>setForm({...form,warehouse_id:e.target.value})}/>
        <input className="input" type="number" placeholder="Qty" value={form.quantity} onChange={e=>setForm({...form,quantity:parseFloat(e.target.value||0)})}/>
        <button className="btn" onClick={add}>Update Inventory</button>
      </div>
      <table className="table"><thead><tr><th>ID</th><th>Product</th><th>Warehouse</th><th>Qty</th><th>Last Updated</th></tr></thead>
      <tbody>{items.map(i=> <tr key={i.id}><td>{i.id}</td><td>{i.product_id}</td><td>{i.warehouse_id}</td><td>{i.quantity}</td><td>{new Date(i.last_updated).toLocaleString()}</td></tr>)}</tbody></table>
    </div>
  );
}
