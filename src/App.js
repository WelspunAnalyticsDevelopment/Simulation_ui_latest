import React from "react";
import Dashboard from './pages/Dashboard';
import Comment from './pages/Comment';
import { About } from "./pages/About";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import { MsalProvider } from "@azure/msal-react";
import { useState } from "react";
import BiReports from "./pages/BiReports";
import { FiscalCompare } from "./pages/FiscalCompare";
import TopLevel from "./pages/TopLevel";
import  SalesHead  from "./pages/SalesHead";
import { Welcome } from "./pages/Welcome";
import { ContactUs } from "./pages/ContactUs";



  function App({msalInstance}) {
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [levelSimulation , setLevelSimulation] = useState(null);

    return (
      
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
        <Main selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} levelSimulation={levelSimulation} setLevelSimulation={setLevelSimulation}>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
            <Route path ="/Dashboard" element= {<Dashboard selectedProduct={selectedProduct} levelSimulation={levelSimulation} />}/>
            <Route path ="/Summary" element= {<About selectedProduct={selectedProduct} />}/>
            <Route path ="/published" element= {<Comment selectedProduct={selectedProduct}/>}/>
            <Route path="/biReports" element= {<BiReports selectedProduct={selectedProduct}/>}/>
            <Route path="/fiscalCompare" element = {<FiscalCompare/>}/>
            <Route path="/leadSimulation" element= {<TopLevel selectedProduct={selectedProduct} levelSimulation={levelSimulation}/>}/>
            <Route path="/salesHead" element={<SalesHead selectedProduct={selectedProduct} levelSimulation={levelSimulation}/>}/>
            <Route path="/admin" element={<SalesHead selectedProduct={selectedProduct} levelSimulation={levelSimulation}/>}/>
            <Route path="/contactUs" element={<ContactUs/>}/>
          </Routes>
        </Main>
        </BrowserRouter>
      </MsalProvider>
    );
  }

  export default App;