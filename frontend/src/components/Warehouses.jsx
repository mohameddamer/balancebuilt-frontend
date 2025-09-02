import React, {useEffect, useState} from "react";
import API from "../api";

export default function Warehouses(){
  const [list,setList]=useState([]);
  const [name,setName]=useState("");
  const [location,setLocation]=useState("");

  useEffect(()=> load(), []);
  function load(){ API.get("/master/warehouses").then(r=>setList(r.data)).catch(()=>setList([])); }
  function add(){ API.post("/master/warehouses",{name,location}).then(()=>{setName("");setLocation("");load();}); }
  function remove(id){ API.delete(`/master/warehouses/${id}`).then(()=>load()); }

  return (
    <div className="card">
      <h3>Warehouses</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {list.map(w => <li key={w.id}>{w.name} — {w.location} <button onClick={()=>remove(w.id)}>Delete</button></li>)}
      </ul>
    </div>
  );
}
