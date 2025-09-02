import React,{useState} from 'react';
import Dashboard from './components/Dashboard';
import Vendors from './components/Vendors';
import Products from './components/Products';
import Warehouses from './components/Warehouses';
import SalesOrders from './components/SalesOrders';
import PurchaseOrders from './components/PurchaseOrders';
import Inventory from './components/Inventory';
import Reports from './components/Reports';
import Upload from './components/Upload';
export default function App(){
  const [tab,setTab]=useState('dashboard');
  return (
    <div className="container">
      <div className="header">
        <div><h2>Finance & Supply Chain - Balance Built</h2></div>
        <div className="nav">
          <a href="#" onClick={e=>{e.preventDefault();setTab('dashboard')}}>Dashboard</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('vendors')}}>Vendors</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('products')}}>Products</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('warehouses')}}>Warehouses</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('sales')}}>Sales Orders</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('purchases')}}>Purchase Orders</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('inventory')}}>Inventory</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('reports')}}>Reports</a>
          <a href="#" onClick={e=>{e.preventDefault();setTab('upload')}}>Upload</a>
        </div>
      </div>

      {tab==='dashboard' && <Dashboard/>}
      {tab==='vendors' && <Vendors/>}
      {tab==='products' && <Products/>}
      {tab==='warehouses' && <Warehouses/>}
      {tab==='sales' && <SalesOrders/>}
      {tab==='purchases' && <PurchaseOrders/>}
      {tab==='inventory' && <Inventory/>}
      {tab==='reports' && <Reports/>}
      {tab==='upload' && <Upload/>}
    </div>
  );
}
