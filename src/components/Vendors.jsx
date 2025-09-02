import React,{useEffect,useState} from 'react';
import { safeGet } from '../api';
export default function Vendors(){
  const [vendors,setVendors]=useState([]);
  const [form,setForm]=useState({name:'',email:'',phone:'',address:'',country:'',tax_id:'',contact_person:'',payment_terms:'Net 30'});
  useEffect(()=> safeGet('/master/vendors','vendors').then(setVendors),[]);
  function add(){ setVendors(prev=>[{...form,id:Date.now()}].concat(prev)); setForm({name:'',email:'',phone:'',address:'',country:'',tax_id:'',contact_person:'',payment_terms:'Net 30'}); }
  return (
    <div className="card">
      <h3>Vendors</h3>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input className="input" placeholder="Country" value={form.country} onChange={e=>setForm({...form,country:e.target.value})}/>
        <button className="btn" onClick={add}>Add Vendor</button>
      </div>
      <table className="table"><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Country</th><th>Tax ID</th><th>Contact</th><th>Payment Terms</th></tr></thead>
      <tbody>{vendors.map(v=> <tr key={v.id}><td>{v.id}</td><td>{v.name}</td><td>{v.email}</td><td>{v.phone}</td><td>{v.address||''}</td><td>{v.country||''}</td><td>{v.tax_id||''}</td><td>{v.contact_person||''}</td><td>{v.payment_terms||''}</td></tr>)}</tbody></table>
    </div>
  );
}
