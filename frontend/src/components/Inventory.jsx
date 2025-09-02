import React, {useEffect, useState} from "react";
import API from "../api";

export default function Inventory(){
  const [items,setItems]=useState([]);
  const [productId,setProductId]=useState("");
  const [warehouseId,setWarehouseId]=useState("");
  const [qty,setQty]=useState("");

  useEffect(()=> load(), []);
  function load(){ API.get("/transactions/inventory").then(r=>setItems(r.data)).catch(()=>setItems([])); }
  function update(){ API.post("/transactions/inventory", {product_id: parseInt(productId||0), warehouse_id: parseInt(warehouseId||0), quantity: parseFloat(qty||0)}).then(()=>{setProductId("");setWarehouseId("");setQty("");load();}); }

  return (
    <div className="card">
      <h3>Inventory</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input placeholder="Product ID" value={productId} onChange={e=>setProductId(e.target.value)} />
        <input placeholder="Warehouse ID" value={warehouseId} onChange={e=>setWarehouseId(e.target.value)} />
        <input placeholder="Quantity" value={qty} onChange={e=>setQty(e.target.value)} />
        <button onClick={update}>Update</button>
      </div>
      <ul>
        {items.map(i => <li key={i.id}>Prod {i.product_id} @ Warehouse {i.warehouse_id} — {i.quantity}</li>)}
      </ul>
    </div>
  );
}
