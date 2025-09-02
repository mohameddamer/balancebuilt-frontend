import React, { useEffect, useState } from "react";
import API from "../api";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Dashboard(){
  const [pl, setPl] = useState([]);
  const [kpis, setKpis] = useState([]);

  useEffect(()=>{
    API.get("/reports/pl_snapshots").then(r=> setPl(r.data)).catch(()=>{});
    API.get("/reports/kpis").then(r=> setKpis(r.data)).catch(()=>{});
  },[]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col card">
          <h3>P&L (Gross / Operating / Net)</h3>
          <div style={{width:'100%', height:300}}>
            <ResponsiveContainer>
              <LineChart data={pl}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gross_profit" stroke="#8884d8" />
                <Line type="monotone" dataKey="operating_profit" stroke="#82ca9d" />
                <Line type="monotone" dataKey="net_profit" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col card">
          <h3>KPIs</h3>
          <ul>
            {kpis.length === 0 ? <li>No KPIs yet</li> : kpis.map(k=> <li key={k.id}>{k.name}: {k.value}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
