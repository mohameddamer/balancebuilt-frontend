import React, {useEffect, useState} from "react";
import API from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Reports(){
  const [pl,setPl] = useState([]);
  const [kpis,setKpis] = useState([]);

  useEffect(()=> {
    API.get("/reports/pl_snapshots").then(r=>setPl(r.data)).catch(()=>setPl([]));
    API.get("/reports/kpis").then(r=>setKpis(r.data)).catch(()=>setKpis([]));
  },[]);

  return (
    <div className="card">
      <h3>Reports</h3>
      <div style={{height:300}}>
        <ResponsiveContainer>
          <BarChart data={pl}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="id"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="total_revenue" fill="#8884d8" />
            <Bar dataKey="net_profit" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4>KPIs</h4>
      <ul>
        {kpis.map(k => <li key={k.id}>{k.name}: {k.value}</li>)}
      </ul>
    </div>
  );
}
