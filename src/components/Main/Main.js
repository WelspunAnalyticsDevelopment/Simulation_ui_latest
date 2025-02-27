import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import Sidebar from '../Slidebar/Slidebar'

function Main({ children, selectedProduct, setSelectedProduct, levelSimulation, setLevelSimulation }) {
  const [visible, setVisible] = useState(true);

  const handleCallback = (childData) => {
    setVisible(!visible);
  };

  return (
    <div className="grid ">
      <div className={visible ? "md:col-2 transition-all transition-duration-300 transition-ease-in" :
        "col-fixed md:col-1 transition-all transition-duration-500 transition-ease-out"}>
        <Sidebar visible={visible} />
      </div>
      <div className={visible ? "grid md:col-10 transition-all transition-duration-300 transition-ease-in" : "grid md:col-11 transition-all transition-duration-500 transition-ease-out"} style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', height: '73px' }}>
        <div className="md:col-12">
          <Header parentCallback={handleCallback} visible={visible} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} levelSimulation={levelSimulation} setLevelSimulation={setLevelSimulation} />
        </div>
        <div className="md:col-12" style={{ minHeight: "1450px", padding: 0, margin: 0 }}>
          <main style={{ paddingInline: "5px" }}>
            {children}
          </main>
        </div>
        <div className="md:col-12">
          <Footer />
        </div>
      </div>
    </div>

  );
}

export default Main;


