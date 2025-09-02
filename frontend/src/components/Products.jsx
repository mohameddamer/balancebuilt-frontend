import React, {useEffect, useState} from "react";
import API from "../api";

export default function Products(){
  const [items,setItems] = useState([]);
  const [name,setName] = useState("");
  const [category,setCategory] = useState("");
  const [price,setPrice] = useState("");

  useEffect(()=> load(), []);
  function load(){ API.get("/master/products").then(r=> setItems(r.data)).catch(()=>setItems([])); }
  function add(){ API.post("/master/products", {name,category,unit_price: parseFloat(price||0)}).then(()=>{setName("");setCategory("");setPrice("");load();}); }
  function remove(id){ API.delete(`/master/products/${id}`).then(()=>load()); }

  return (
    <div className="card">
      <h3>Products</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>

      <ul>
        {items.map(p => <li key={p.id}>{p.name} — {p.category} — ${p.unit_price} <button onClick={()=>remove(p.id)}>Delete</button></li>)}
      </ul>
    </div>
  );
}
