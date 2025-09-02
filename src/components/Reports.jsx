import React,{useEffect,useState} from 'react';
import { safeGet } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export default function Reports(){
  const [pl,setPl]=useState([]); const [transactions,setTransactions]=useState([]);
  useEffect(()=>{ safeGet('/finance/pl_snapshots','pl_snapshots').then(setPl); safeGet('/finance/transactions','transactions').then(setTransactions); },[]);
  const revenueData = pl.map(p=>({name:p.period_end? p.period_end.slice(0,10):'', revenue:p.total_revenue, profit:p.net_profit}));
  const expenseBreakdown = [{name:'COGS',value:5000},{name:'Salaries',value:3000},{name:'Marketing',value:2000}];
  const COLORS = ['#0088FE','#00C49F','#FFBB28'];
  return (
    <div className="card">
      <h3>Reports</h3>
      <div style={{height:300}}>
        <ResponsiveContainer>
          <BarChart data={revenueData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="revenue" fill="#145374"/><Bar dataKey="profit" fill="#7DA9C7"/></BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:'flex',gap:16,marginTop:12}}>
        <div className="card" style={{width:300}}><h4>Expense Breakdown</h4><div style={{height:200}}><ResponsiveContainer><PieChart><Pie data={expenseBreakdown} dataKey="value" nameKey="name" outerRadius={70} label>{expenseBreakdown.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie></PieChart></ResponsiveContainer></div></div>
        <div className="card" style={{flex:1}}><h4>Transactions</h4><table className="table"><thead><tr><th>ID</th><th>Date</th><th>Type</th><th>Account</th><th>Amount</th></tr></thead><tbody>{transactions.map(t=> <tr key={t.id}><td>{t.id}</td><td>{new Date(t.date).toLocaleDateString()}</td><td>{t.txn_type}</td><td>{t.account}</td><td>{t.amount}</td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}
