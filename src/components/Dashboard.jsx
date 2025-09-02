import React, {useEffect,useState} from 'react';
import { safeGet } from '../api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
export default function Dashboard(){
  const [pl,setPl]=useState([]); const [kpis,setKpis]=useState([]);
  useEffect(()=>{ safeGet('/finance/pl_snapshots','pl_snapshots').then(setPl); safeGet('/finance/kpis','kpis').then(setKpis); },[]);
  const revenueTrend = pl.map(p=>({name: p.period_end ? p.period_end.slice(0,10) : '', revenue: p.total_revenue, net: p.net_profit}));
  const expenseBreakdown = [{name:'COGS',value:5000},{name:'Salaries',value:3000},{name:'Marketing',value:2000}];
  const COLORS = ['#0088FE','#00C49F','#FFBB28'];
  return (
    <div>
      <div className="card">
        <h3>Revenue Trend</h3>
        <div style={{height:300}}>
          <ResponsiveContainer>
            <LineChart data={revenueTrend}>
              <XAxis dataKey="name"/><YAxis/><Tooltip/>
              <Line type="monotone" dataKey="revenue" stroke="#145374"/><Line type="monotone" dataKey="net" stroke="#7DA9C7"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Top KPIs</h3>
          <ul>{kpis.map(k=> <li key={k.id}><strong>{k.name}:</strong> {k.value} {k.note ? "— "+k.note : ""}</li>)}</ul>
        </div>

        <div className="card">
          <h3>Expense Breakdown</h3>
          <div style={{height:200}}>
            <ResponsiveContainer>
              <PieChart><Pie data={expenseBreakdown} dataKey="value" nameKey="name" outerRadius={70} label>{expenseBreakdown.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
