import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Vendors from "./components/Vendors";
import Products from "./components/Products";
import Warehouses from "./components/Warehouses";
import SalesOrders from "./components/SalesOrders";
import PurchaseOrders from "./components/PurchaseOrders";
import Inventory from "./components/Inventory";
import Reports from "./components/Reports";
import Upload from "./components/Upload";

export default function App(){
  return (
    <div className="container">
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <h1>BalanceBuilt</h1>
        <nav>
          <Link to="/" style={{marginRight:12}}>Dashboard</Link>
          <Link to="/vendors" style={{marginRight:12}}>Vendors</Link>
          <Link to="/products" style={{marginRight:12}}>Products</Link>
          <Link to="/warehouses" style={{marginRight:12}}>Warehouses</Link>
          <Link to="/sales" style={{marginRight:12}}>Sales Orders</Link>
          <Link to="/purchases" style={{marginRight:12}}>Purchase Orders</Link>
          <Link to="/inventory" style={{marginRight:12}}>Inventory</Link>
          <Link to="/reports" style={{marginRight:12}}>Reports</Link>
          <Link to="/upload">Upload</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/vendors" element={<Vendors/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/warehouses" element={<Warehouses/>} />
          <Route path="/sales" element={<SalesOrders/>} />
          <Route path="/purchases" element={<PurchaseOrders/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/upload" element={<Upload/>} />
        </Routes>
      </main>
    </div>
  );
}
