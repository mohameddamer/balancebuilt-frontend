import React, {useEffect, useState} from "react";
import API from "../api";

export default function Vendors(){
  const [vendors,setVendors] = useState([]);
  const [name,setName] = useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");

  useEffect(()=>{ load(); }, []);
  function load(){ API.get("/master/vendors").then(r=>setVendors(r.data)).catch(()=>setVendors([])); }

  function add(){
    API.post("/master/vendors", {name,email,phone}).then(()=>{setName("");setEmail("");setPhone("");load();});
  }
  function remove(id){ API.delete(`/master/vendors/${id}`).then(()=>load()).catch(()=>load()); }

  return (
    <div className="card">
      <h3>Vendors</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {vendors.map(v => <li key={v.id}>{v.name} — {v.email} — {v.phone} <button onClick={()=>remove(v.id)}>Delete</button></li>)}
      </ul>
    </div>
  );
}
