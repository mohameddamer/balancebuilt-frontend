import React,{useEffect,useState} from 'react';
import { safeGet } from '../api';
export default function Warehouses(){
  const [list,setList]=useState([]);
  const [form,setForm]=useState({name:'',location:'',capacity:0,manager:'',contact:''});
  useEffect(()=> safeGet('/master/warehouses','warehouses').then(setList),[]);
  function add(){ setList(prev=>[{...form,id:Date.now()}].concat(prev)); setForm({name:'',location:'',capacity:0,manager:'',contact:''}); }
  return (
    <div className="card">
      <h3>Warehouses</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <input className="input" type="number" placeholder="Capacity" value={form.capacity} onChange={e=>setForm({...form,capacity:parseFloat(e.target.value||0)})}/>
        <button className="btn" onClick={add}>Add Warehouse</button>
      </div>
      <table className="table"><thead><tr><th>ID</th><th>Name</th><th>Location</th><th>Capacity</th><th>Manager</th><th>Contact</th></tr></thead>
      <tbody>{list.map(w=> <tr key={w.id}><td>{w.id}</td><td>{w.name}</td><td>{w.location}</td><td>{w.capacity}</td><td>{w.manager||''}</td><td>{w.contact||''}</td></tr>)}</tbody></table>
    </div>
  );
}
