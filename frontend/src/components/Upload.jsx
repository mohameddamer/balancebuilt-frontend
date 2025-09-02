import React, {useState} from "react";
import API from "../api";

export default function Upload(){
  const [file,setFile] = useState(null);
  const [type,setType] = useState("customers");
  const [msg,setMsg] = useState("");

  async function submit(){
    if(!file){ setMsg("Select a file"); return; }
    const fd = new FormData();
    fd.append("file", file);
    try{
      const res = await API.post(`/upload/${type}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setMsg(JSON.stringify(res.data));
    }catch(e){ setMsg("Upload failed: " + (e?.response?.data?.detail || e.message)); }
  }

  return (
    <div className="card">
      <h3>CSV Upload</h3>
      <div style={{display:'flex',gap:8}}>
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="customers">Customers</option>
          <option value="products">Products</option>
          <option value="inventory">Inventory</option>
        </select>
        <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} />
        <button onClick={submit}>Upload</button>
      </div>
      <div style={{marginTop:8}}>{msg}</div>
    </div>
  );
}
