import React,{useState} from 'react';
import API from '../api';
export default function Upload(){
  const [file,setFile]=useState(null); const [type,setType]=useState('vendors'); const [msg,setMsg]=useState('');
  async function submit(){
    if(!file){ setMsg('Select CSV file'); return; }
    const fd = new FormData(); fd.append('file', file);
    try{
      const res = await API.post(`/upload/${type}`, fd, { headers: {'Content-Type':'multipart/form-data'} });
      setMsg(JSON.stringify(res.data));
    }catch(e){ setMsg('Upload failed: '+(e?.response?.data?.detail || e.message)); }
  }
  return (
    <div className="card">
      <h3>Upload CSV / Bulk Import</h3>
      <div className="filters">
        <label className="label">Type</label>
        <select className="input" value={type} onChange={e=>setType(e.target.value)}>
          <option value="vendors">Vendors</option>
          <option value="products">Products</option>
          <option value="inventory">Inventory</option>
        </select>
        <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])}/>
        <button className="btn" onClick={submit}>Upload</button>
      </div>
      <div style={{marginTop:8}}>{msg}</div>
    </div>
  );
}
