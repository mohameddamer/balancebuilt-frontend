import React,{useEffect,useState} from 'react';
import { safeGet } from '../api';
export default function Products(){
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({sku:'',name:'',category:'',unit_price:0,unit_cost:0,supplier_id:'',reorder_level:0});
  useEffect(()=> safeGet('/master/products','products').then(setItems),[]);
  function add(){ setItems(prev=>[{...form,id:Date.now()}].concat(prev)); setForm({sku:'',name:'',category:'',unit_price:0,unit_cost:0,supplier_id:'',reorder_level:0}); }
  return (
    <div className="card">
      <h3>Products</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        <input className="input" placeholder="SKU" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})}/>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        <input className="input" type="number" placeholder="Unit Price" value={form.unit_price} onChange={e=>setForm({...form,unit_price:parseFloat(e.target.value||0)})}/>
        <button className="btn" onClick={add}>Add Product</button>
      </div>
      <table className="table"><thead><tr><th>ID</th><th>SKU</th><th>Name</th><th>Category</th><th>Unit Price</th><th>Unit Cost</th><th>Supplier</th><th>Reorder</th></tr></thead>
      <tbody>{items.map(p=> <tr key={p.id}><td>{p.id}</td><td>{p.sku}</td><td>{p.name}</td><td>{p.category}</td><td>{p.unit_price}</td><td>{p.unit_cost}</td><td>{p.supplier_id||''}</td><td>{p.reorder_level}</td></tr>)}</tbody></table>
    </div>
  );
}
