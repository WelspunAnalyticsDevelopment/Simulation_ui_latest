import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";

export const Summary = ({ headerGroup, footerGroup, dataTableAnnual, loading, selectedProduct, currentUrl, levelSimulation }) => {

  console.log("dataTableAnnual", dataTableAnnual, "currentUrl", currentUrl[currentUrl.length - 1])


  return (
    <div className="grid">
      <div className="col-12">
        <Card>
          <div className="grid">
            <div className='col-12'>
              {currentUrl[currentUrl.length - 1] == 'Dashboard' ?
                <DataTable id="summaryTable" value={dataTableAnnual} footerColumnGroup={footerGroup}
                  showGridlines scrollable stripedRows headerColumnGroup={headerGroup} scrollHeight='500px' tableStyle={{ minWidth: '50rem' }} loading={dataTableAnnual.length > 0 ? loading : null} >

                  {/* Render customerName column as a frozen column */}
                  <Column frozen field="customerName"></Column>
                  <Column frozen field="program"></Column>
                  {levelSimulation && (levelSimulation.name == 'Plant Level' || levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') ? <Column frozen field="plant"></Column> : <Column frozen field="region"></Column>}
                  <Column frozen field="productSubCat" />
                  <Column frozen field="lastYear.matcode"></Column>
                  <Column field="lastYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.aprilSqMt"></Column> : <Column field="lastYear.aprilMt"></Column>}
                  <Column field="lastYear.aprilRate"></Column>
                  <Column field="lastYear.aprilValue"></Column>
                  <Column field="lastYear.aprilUSDN"></Column>
                  <Column field="lastYear.aprilUVR"></Column>
                  
                  <Column field="lastYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.maySqMt"></Column> : <Column field="lastYear.mayMt"></Column>}

                  <Column field="lastYear.mayRate"></Column>
                  <Column field="lastYear.mayValue"></Column>
                  <Column field="lastYear.mayUSDN"></Column>
                  <Column field="lastYear.mayUVR"></Column>
                  
                  <Column field="lastYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.juneSqMt"></Column> : <Column field="lastYear.juneMt"></Column>}

                  <Column field="lastYear.juneRate"></Column>
                  <Column field="lastYear.juneValue"></Column>
                  <Column field="lastYear.juneUSDN"></Column>
                  <Column field="lastYear.juneUVR"></Column>
                  
                  <Column field="lastYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.julySqMt"></Column> : <Column field="lastYear.julyMt"></Column>}

                  <Column field="lastYear.julyRate"></Column>
                  <Column field="lastYear.julyValue"></Column>
                  <Column field="lastYear.julyUSDN"></Column>
                  <Column field="lastYear.julyUVR"></Column>
                  
                  <Column field="lastYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.augustSqMt"></Column> : <Column field="lastYear.augMt"></Column>}

                  <Column field="lastYear.augustRate"></Column>
                  <Column field="lastYear.augustValue"></Column>
                  <Column field="lastYear.augustUSDN"></Column>
                  <Column field="lastYear.augustUVR"></Column>
                  
                  <Column field="lastYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.septemberSqMt"></Column> : <Column field="lastYear.septemberMt"></Column>}

                  <Column field="lastYear.septemberRate"></Column>
                  <Column field="lastYear.septemberValue"></Column>
                  <Column field="lastYear.septemberUSDN"></Column>
                  <Column field="lastYear.septemberUVR"></Column>
                  
                  <Column field="lastYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.octSqMt"></Column> : <Column field="lastYear.octMt"></Column>}

                  <Column field="lastYear.octoberRate"></Column>
                  <Column field="lastYear.octoberValue"></Column>
                  <Column field="lastYear.octoberUSDN"></Column>
                  <Column field="lastYear.octoberUVR"></Column>
                  
                  <Column field="lastYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.novSqMt"></Column> : <Column field="lastYear.novMt"></Column>}

                  <Column field="lastYear.novemberRate"></Column>
                  <Column field="lastYear.novemberValue"></Column>
                  <Column field="lastYear.novemberUSDN"></Column>
                  <Column field="lastYear.novemberUVR"></Column>
                  
                  <Column field="lastYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.decSqMt"></Column> : <Column field="lastYear.decMt"></Column>}

                  <Column field="lastYear.decemberRate"></Column>
                  <Column field="lastYear.decemberValue"></Column>
                  <Column field="lastYear.decemberUSDN"></Column>
                  <Column field="lastYear.decemberUVR"></Column>
                  
                  <Column field="lastYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.janSqMt"></Column> : <Column field="lastYear.janMt"></Column>}

                  <Column field="lastYear.januaryRate"></Column>
                  <Column field="lastYear.januaryValue"></Column>
                  <Column field="lastYear.januaryUSDN"></Column>
                  <Column field="lastYear.januaryUVR"></Column>
                  
                  <Column field="lastYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.febSqMt"></Column> : <Column field="lastYear.febMt"></Column>}

                  <Column field="lastYear.februaryRate"></Column>
                  <Column field="lastYear.februaryValue"></Column>
                  <Column field="lastYear.februaryUSDN"></Column>
                  <Column field="lastYear.februaryUVR"></Column>
                  
                  <Column field="lastYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.marchSqMt"></Column> : <Column field="lastYear.marMt"></Column>}

                  <Column field="lastYear.marchRate"></Column>
                  <Column field="lastYear.marchValue"></Column>
                  <Column field="lastYear.marchUSDN"></Column>
                  <Column field="lastYear.marchUVR"></Column>
                  


                  <Column field="thisYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.aprilSqMt"></Column> : <Column field="thisYear.aprilMt"></Column>}
                  <Column field="thisYear.aprilRate"></Column>
                  <Column field="thisYear.aprilValue"></Column>
                  <Column field="thisYear.aprilUSDN"></Column>
                  <Column field="thisYear.aprilUVR"></Column>
                  
                  <Column field="thisYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.maySqMt"></Column> : <Column field="thisYear.mayMt"></Column>}
                  <Column field="thisYear.mayRate"></Column>
                  <Column field="thisYear.mayValue"></Column>
                  <Column field="thisYear.mayUSDN"></Column>
                  <Column field="thisYear.mayUVR"></Column>
                  
                  <Column field="thisYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.juneSqMt"></Column> : <Column field="thisYear.juneMt"></Column>}
                  <Column field="thisYear.juneRate"></Column>
                  <Column field="thisYear.juneValue"></Column>
                  <Column field="thisYear.juneUSDN"></Column>
                  <Column field="thisYear.juneUVR"></Column>
                  
                  <Column field="thisYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.julySqMt"></Column> : <Column field="thisYear.julyMt"></Column>}
                  <Column field="thisYear.julyRate"></Column>
                  <Column field="thisYear.julyValue"></Column>
                  <Column field="thisYear.julyUSDN"></Column>
                  <Column field="thisYear.julyUVR"></Column>
                  
                  <Column field="thisYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.augustSqMt"></Column> : <Column field="thisYear.augMt"></Column>}
                  <Column field="thisYear.augustRate"></Column>
                  <Column field="thisYear.augustValue"></Column>
                  <Column field="thisYear.augustUSDN"></Column>
                  <Column field="thisYear.augustUVR"></Column>
                  
                  <Column field="thisYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.septemberSqMt"></Column> : <Column field="thisYear.septemberMt"></Column>}
                  <Column field="thisYear.septemberRate"></Column>
                  <Column field="thisYear.septemberValue"></Column>
                  <Column field="thisYear.septemberUSDN"></Column>
                  <Column field="thisYear.septemberUVR"></Column>
                  
                  <Column field="thisYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.octSqMt"></Column> : <Column field="thisYear.octMt"></Column>}
                  <Column field="thisYear.octoberRate"></Column>
                  <Column field="thisYear.octoberValue"></Column>
                  <Column field="thisYear.octoberUSDN"></Column>
                  <Column field="thisYear.octoberUVR"></Column>
                  
                  <Column field="thisYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.novSqMt"></Column> : <Column field="thisYear.novMt"></Column>}
                  <Column field="thisYear.novemberRate"></Column>
                  <Column field="thisYear.novemberValue"></Column>
                  <Column field="thisYear.novemberUSDN"></Column>
                  <Column field="thisYear.novemberUVR"></Column>
                  
                  <Column field="thisYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.decSqMt"></Column> : <Column field="thisYear.decMt"></Column>}
                  <Column field="thisYear.decemberRate"></Column>
                  <Column field="thisYear.decemberValue"></Column>
                  <Column field="thisYear.decemberUSDN"></Column>
                  <Column field="thisYear.decemberUVR"></Column>

                  <Column field="thisYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.janSqMt"></Column> : <Column field="thisYear.janMt"></Column>}
                  <Column field="thisYear.januaryRate"></Column>
                  <Column field="thisYear.januaryValue"></Column>
                  <Column field="thisYear.januaryUSDN"></Column>
                  <Column field="thisYear.januaryUVR"></Column>
                  
                  <Column field="thisYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.febSqMt"></Column> : <Column field="thisYear.febMt"></Column>}
                  <Column field="thisYear.februaryRate"></Column>
                  <Column field="thisYear.februaryValue"></Column>
                  <Column field="thisYear.februaryUSDN"></Column>
                  <Column field="thisYear.februaryUVR"></Column>
                  
                  <Column field="thisYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.marchSqMt"></Column> : <Column field="thisYear.marMt"></Column>}
                  <Column field="thisYear.marchRate"></Column>
                  <Column field="thisYear.marchValue"></Column>
                  <Column field="thisYear.marchUSDN"></Column>
                  <Column field="thisYear.marchUVR"></Column>
                  

                  <Column field="thisYear.totalSU"></Column>
                  <Column field="thisYear.totalRate"></Column>
                  <Column field="thisYear.totalValue"></Column>
                  <Column field="thisYear.totalUSDN"></Column>
                  
                  {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column field="thisYear.totalKGS" /> : (selectedProduct && (selectedProduct == 'Rugs') ? <Column field="thisYear.totalSQMT" /> : <Column field="thisYear.totalMTR" />)}
                  {/* <Column field="thisYear.q1UVR"></Column>
                  <Column field="thisYear.q2UVR"></Column>
                  <Column field="thisYear.q3UVR"></Column>
                  <Column field="thisYear.q4UVR"></Column> */}
                  <Column field="thisYear.yearlyUVR"></Column>

                </DataTable> : null}

              {currentUrl[currentUrl.length - 1] == 'Summary' ?
                <DataTable value={dataTableAnnual} showGridlines scrollable stripedRows headerColumnGroup={headerGroup} scrollHeight='500px' tableStyle={{ minWidth: '50rem' }} loading={dataTableAnnual.length > 0 ? loading : null} >
                  {/* Render customerName column as a frozen column */}
                  <Column frozen field="customerName"></Column>

                  {/* Render other columns dynamically
                {SalesData.map((item) => (
                  // Render only if the column is not "customerName"
                  item.name !== "customerName" && <Column key={item.name} body={(e) => bodyGroup(e, item.name)} />
                ))} */}

                  <Column field="thisYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.aprilSqMt"></Column> : <Column field="thisYear.aprilMt"></Column>}
                  <Column field="thisYear.aprilRate"></Column>
                  <Column field="thisYear.aprilValue"></Column>
                  <Column field="thisYear.aprilUSDN"></Column>
                  <Column field="thisYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.maySqMt"></Column> : <Column field="thisYear.mayMt"></Column>}
                  <Column field="thisYear.mayRate"></Column>
                  <Column field="thisYear.mayValue"></Column>
                  <Column field="thisYear.mayUSDN"></Column>
                  <Column field="thisYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.juneSqMt"></Column> : <Column field="thisYear.juneMt"></Column>}
                  <Column field="thisYear.juneRate"></Column>
                  <Column field="thisYear.juneValue"></Column>
                  <Column field="thisYear.juneUSDN"></Column>
                  <Column field="thisYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.julySqMt"></Column> : <Column field="thisYear.julyMt"></Column>}
                  <Column field="thisYear.julyRate"></Column>
                  <Column field="thisYear.julyValue"></Column>
                  <Column field="thisYear.julyUSDN"></Column>
                  <Column field="thisYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.augustSqMt"></Column> : <Column field="thisYear.augMt"></Column>}
                  <Column field="thisYear.augustRate"></Column>
                  <Column field="thisYear.augustValue"></Column>
                  <Column field="thisYear.augustUSDN"></Column>
                  <Column field="thisYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.sepSqMt"></Column> : <Column field="thisYear.septemberMt"></Column>}
                  <Column field="thisYear.septemberRate"></Column>
                  <Column field="thisYear.septemberValue"></Column>
                  <Column field="thisYear.septemberUSDN"></Column>
                  <Column field="thisYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.octSqMt"></Column> : <Column field="thisYear.octMt"></Column>}
                  <Column field="thisYear.octoberRate"></Column>
                  <Column field="thisYear.octoberValue"></Column>
                  <Column field="thisYear.octoberUSDN"></Column>
                  <Column field="thisYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.novSqMt"></Column> : <Column field="thisYear.novMt"></Column>}
                  <Column field="thisYear.novemberRate"></Column>
                  <Column field="thisYear.novemberValue"></Column>
                  <Column field="thisYear.novemberUSDN"></Column>
                  <Column field="thisYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.decSqMt"></Column> : <Column field="thisYear.decMt"></Column>}
                  <Column field="thisYear.decemberRate"></Column>
                  <Column field="thisYear.decemberValue"></Column>
                  <Column field="thisYear.decemberUSDN"></Column>
                  <Column field="thisYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.janSqMt"></Column> : <Column field="thisYear.janMt"></Column>}
                  <Column field="thisYear.januaryRate"></Column>
                  <Column field="thisYear.januaryValue"></Column>
                  <Column field="thisYear.januaryUSDN"></Column>
                  <Column field="thisYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.febSqMt"></Column> : <Column field="thisYear.febMt"></Column>}
                  <Column field="thisYear.februaryRate"></Column>
                  <Column field="thisYear.februaryValue"></Column>
                  <Column field="thisYear.februaryUSDN"></Column>
                  <Column field="thisYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.marchSqMt"></Column> : <Column field="thisYear.marMt"></Column>}
                  <Column field="thisYear.marchRate"></Column>
                  <Column field="thisYear.marchValue"></Column>
                  <Column field="thisYear.marchUSDN"></Column>

                </DataTable> : null}

              {currentUrl[currentUrl.length - 1] == 'leadSimulation' ?
                <DataTable value={dataTableAnnual} footerColumnGroup={footerGroup} showGridlines scrollable stripedRows headerColumnGroup={headerGroup} scrollHeight='500px' tableStyle={{ minWidth: '50rem' }} loading={dataTableAnnual.length > 0 ? loading : null} >
                  <Column frozen field="customerName"></Column>
                  <Column frozen field="program"></Column>
                  {levelSimulation && (levelSimulation.name == 'Plant Level' || levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') ? <Column frozen field="plant"></Column> : <Column frozen field="region"></Column>}
                  <Column frozen field="productSubCat" />
                  <Column frozen field="lastYear.matcode"></Column>
                  <Column field="lastYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.aprilSqMt"></Column> : <Column field="lastYear.aprilMt"></Column>}
                  <Column field="lastYear.aprilRate"></Column>
                  <Column field="lastYear.aprilValue"></Column>
                  <Column field="lastYear.aprilUSDN"></Column>
                  <Column field="lastYear.aprilUVR"></Column>
                  
                  <Column field="lastYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.maySqMt"></Column> : <Column field="lastYear.mayMt"></Column>}

                  <Column field="lastYear.mayRate"></Column>
                  <Column field="lastYear.mayValue"></Column>
                  <Column field="lastYear.mayUSDN"></Column>
                  <Column field="lastYear.mayUVR"></Column>
                  
                  <Column field="lastYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.juneSqMt"></Column> : <Column field="lastYear.juneMt"></Column>}

                  <Column field="lastYear.juneRate"></Column>
                  <Column field="lastYear.juneValue"></Column>
                  <Column field="lastYear.juneUSDN"></Column>
                  <Column field="lastYear.juneUVR"></Column>
                  
                  <Column field="lastYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.julySqMt"></Column> : <Column field="lastYear.julyMt"></Column>}

                  <Column field="lastYear.julyRate"></Column>
                  <Column field="lastYear.julyValue"></Column>
                  <Column field="lastYear.julyUSDN"></Column>
                  <Column field="lastYear.julyUVR"></Column>
                  
                  <Column field="lastYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.augustSqMt"></Column> : <Column field="lastYear.augMt"></Column>}

                  <Column field="lastYear.augustRate"></Column>
                  <Column field="lastYear.augustValue"></Column>
                  <Column field="lastYear.augustUSDN"></Column>
                  <Column field="lastYear.augustUVR"></Column>
                  
                  <Column field="lastYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.septemberSqMt"></Column> : <Column field="lastYear.septemberMt"></Column>}

                  <Column field="lastYear.septemberRate"></Column>
                  <Column field="lastYear.septemberValue"></Column>
                  <Column field="lastYear.septemberUSDN"></Column>
                  <Column field="lastYear.septemberUVR"></Column>
                  
                  <Column field="lastYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.octSqMt"></Column> : <Column field="lastYear.octMt"></Column>}

                  <Column field="lastYear.octoberRate"></Column>
                  <Column field="lastYear.octoberValue"></Column>
                  <Column field="lastYear.octoberUSDN"></Column>
                  <Column field="lastYear.octoberUVR"></Column>
                  
                  <Column field="lastYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.novSqMt"></Column> : <Column field="lastYear.novMt"></Column>}

                  <Column field="lastYear.novemberRate"></Column>
                  <Column field="lastYear.novemberValue"></Column>
                  <Column field="lastYear.novemberUSDN"></Column>
                  <Column field="lastYear.novemberUVR"></Column>
                  
                  <Column field="lastYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.decSqMt"></Column> : <Column field="lastYear.decMt"></Column>}

                  <Column field="lastYear.decemberRate"></Column>
                  <Column field="lastYear.decemberValue"></Column>
                  <Column field="lastYear.decemberUSDN"></Column>
                  <Column field="lastYear.decemberUVR"></Column>
                  
                  <Column field="lastYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.janSqMt"></Column> : <Column field="lastYear.janMt"></Column>}

                  <Column field="lastYear.januaryRate"></Column>
                  <Column field="lastYear.januaryValue"></Column>
                  <Column field="lastYear.januaryUSDN"></Column>
                  <Column field="lastYear.januaryUVR"></Column>
                  
                  <Column field="lastYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.febSqMt"></Column> : <Column field="lastYear.febMt"></Column>}

                  <Column field="lastYear.februaryRate"></Column>
                  <Column field="lastYear.februaryValue"></Column>
                  <Column field="lastYear.februaryUSDN"></Column>
                  <Column field="lastYear.februaryUVR"></Column>
                  
                  <Column field="lastYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.marchSqMt"></Column> : <Column field="lastYear.marMt"></Column>}

                  <Column field="lastYear.marchRate"></Column>
                  <Column field="lastYear.marchValue"></Column>
                  <Column field="lastYear.marchUSDN"></Column>
                  <Column field="lastYear.marchUVR"></Column>
                  


                  <Column field="thisYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.aprilSqMt"></Column> : <Column field="thisYear.aprilMt"></Column>}
                  <Column field="thisYear.aprilRate"></Column>
                  <Column field="thisYear.aprilValue"></Column>
                  <Column field="thisYear.aprilUSDN"></Column>
                  <Column field="thisYear.aprilUVR"></Column>
                  
                  <Column field="thisYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.maySqMt"></Column> : <Column field="thisYear.mayMt"></Column>}
                  <Column field="thisYear.mayRate"></Column>
                  <Column field="thisYear.mayValue"></Column>
                  <Column field="thisYear.mayUSDN"></Column>
                  <Column field="thisYear.mayUVR"></Column>
                  
                  <Column field="thisYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.juneSqMt"></Column> : <Column field="thisYear.juneMt"></Column>}
                  <Column field="thisYear.juneRate"></Column>
                  <Column field="thisYear.juneValue"></Column>
                  <Column field="thisYear.juneUSDN"></Column>
                  <Column field="thisYear.juneUVR"></Column>
                  
                  <Column field="thisYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.julySqMt"></Column> : <Column field="thisYear.julyMt"></Column>}
                  <Column field="thisYear.julyRate"></Column>
                  <Column field="thisYear.julyValue"></Column>
                  <Column field="thisYear.julyUSDN"></Column>
                  <Column field="thisYear.julyUVR"></Column>
                  
                  <Column field="thisYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.augustSqMt"></Column> : <Column field="thisYear.augMt"></Column>}
                  <Column field="thisYear.augustRate"></Column>
                  <Column field="thisYear.augustValue"></Column>
                  <Column field="thisYear.augustUSDN"></Column>
                  <Column field="thisYear.augustUVR"></Column>
                  
                  <Column field="thisYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.septemberSqMt"></Column> : <Column field="thisYear.septemberMt"></Column>}
                  <Column field="thisYear.septemberRate"></Column>
                  <Column field="thisYear.septemberValue"></Column>
                  <Column field="thisYear.septemberUSDN"></Column>
                  <Column field="thisYear.septemberUVR"></Column>
                  
                  <Column field="thisYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.octSqMt"></Column> : <Column field="thisYear.octMt"></Column>}
                  <Column field="thisYear.octoberRate"></Column>
                  <Column field="thisYear.octoberValue"></Column>
                  <Column field="thisYear.octoberUSDN"></Column>
                  <Column field="thisYear.octoberUVR"></Column>
                  
                  <Column field="thisYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.novSqMt"></Column> : <Column field="thisYear.novMt"></Column>}
                  <Column field="thisYear.novemberRate"></Column>
                  <Column field="thisYear.novemberValue"></Column>
                  <Column field="thisYear.novemberUSDN"></Column>
                  <Column field="thisYear.novemberUVR"></Column>
                  
                  <Column field="thisYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.decSqMt"></Column> : <Column field="thisYear.decMt"></Column>}
                  <Column field="thisYear.decemberRate"></Column>
                  <Column field="thisYear.decemberValue"></Column>
                  <Column field="thisYear.decemberUSDN"></Column>
                  <Column field="thisYear.decemberUVR"></Column>

                  <Column field="thisYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.janSqMt"></Column> : <Column field="thisYear.janMt"></Column>}
                  <Column field="thisYear.januaryRate"></Column>
                  <Column field="thisYear.januaryValue"></Column>
                  <Column field="thisYear.januaryUSDN"></Column>
                  <Column field="thisYear.januaryUVR"></Column>
                  
                  <Column field="thisYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.febSqMt"></Column> : <Column field="thisYear.febMt"></Column>}
                  <Column field="thisYear.februaryRate"></Column>
                  <Column field="thisYear.februaryValue"></Column>
                  <Column field="thisYear.februaryUSDN"></Column>
                  <Column field="thisYear.februaryUVR"></Column>
                  
                  <Column field="thisYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.marchSqMt"></Column> : <Column field="thisYear.marMt"></Column>}
                  <Column field="thisYear.marchRate"></Column>
                  <Column field="thisYear.marchValue"></Column>
                  <Column field="thisYear.marchUSDN"></Column>
                  <Column field="thisYear.marchUVR"></Column>
                  

                  <Column field="thisYear.totalSU"></Column>
                  <Column field="thisYear.totalRate"></Column>
                  <Column field="thisYear.totalValue"></Column>
                  <Column field="thisYear.totalUSDN"></Column>
                  
                  {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column field="thisYear.totalKGS" /> : (selectedProduct && (selectedProduct == 'Rugs') ? <Column field="thisYear.totalSQMT" /> : <Column field="thisYear.totalMTR" />)}
                  {/* <Column field="thisYear.q1UVR"></Column>
                  <Column field="thisYear.q2UVR"></Column>
                  <Column field="thisYear.q3UVR"></Column>
                  <Column field="thisYear.q4UVR"></Column> */}
                  <Column field="thisYear.yearlyUVR"></Column>


                </DataTable> : null}

                {currentUrl[currentUrl.length - 1] == 'salesHead' ?
                <DataTable value={dataTableAnnual} footerColumnGroup={footerGroup} showGridlines scrollable stripedRows headerColumnGroup={headerGroup} scrollHeight='500px' tableStyle={{ minWidth: '50rem' }} loading={dataTableAnnual.length > 0 ? loading : null} >
                  <Column frozen field="customerName"></Column>
                  <Column frozen field="program"></Column>
                  {levelSimulation && (levelSimulation.name == 'Plant Level' || levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') ? <Column frozen field="plant"></Column> : <Column frozen field="region"></Column>}
                  <Column frozen field="productSubCat" />
                  <Column frozen field="lastYear.matcode"></Column>
                  <Column field="lastYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.aprilSqMt"></Column> : <Column field="lastYear.aprilMt"></Column>}
                  <Column field="lastYear.aprilRate"></Column>
                  <Column field="lastYear.aprilValue"></Column>
                  <Column field="lastYear.aprilUSDN"></Column>
                  <Column field="lastYear.aprilUVR"></Column>
                  
                  <Column field="lastYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.maySqMt"></Column> : <Column field="lastYear.mayMt"></Column>}

                  <Column field="lastYear.mayRate"></Column>
                  <Column field="lastYear.mayValue"></Column>
                  <Column field="lastYear.mayUSDN"></Column>
                  <Column field="lastYear.mayUVR"></Column>
                  
                  <Column field="lastYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.juneSqMt"></Column> : <Column field="lastYear.juneMt"></Column>}

                  <Column field="lastYear.juneRate"></Column>
                  <Column field="lastYear.juneValue"></Column>
                  <Column field="lastYear.juneUSDN"></Column>
                  <Column field="lastYear.juneUVR"></Column>
                  
                  <Column field="lastYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.julySqMt"></Column> : <Column field="lastYear.julyMt"></Column>}

                  <Column field="lastYear.julyRate"></Column>
                  <Column field="lastYear.julyValue"></Column>
                  <Column field="lastYear.julyUSDN"></Column>
                  <Column field="lastYear.julyUVR"></Column>
                  
                  <Column field="lastYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.augustSqMt"></Column> : <Column field="lastYear.augMt"></Column>}

                  <Column field="lastYear.augustRate"></Column>
                  <Column field="lastYear.augustValue"></Column>
                  <Column field="lastYear.augustUSDN"></Column>
                  <Column field="lastYear.augustUVR"></Column>
                  
                  <Column field="lastYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.septemberSqMt"></Column> : <Column field="lastYear.septemberMt"></Column>}

                  <Column field="lastYear.septemberRate"></Column>
                  <Column field="lastYear.septemberValue"></Column>
                  <Column field="lastYear.septemberUSDN"></Column>
                  <Column field="lastYear.septemberUVR"></Column>
                  
                  <Column field="lastYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.octSqMt"></Column> : <Column field="lastYear.octMt"></Column>}

                  <Column field="lastYear.octoberRate"></Column>
                  <Column field="lastYear.octoberValue"></Column>
                  <Column field="lastYear.octoberUSDN"></Column>
                  <Column field="lastYear.octoberUVR"></Column>
                  
                  <Column field="lastYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.novSqMt"></Column> : <Column field="lastYear.novMt"></Column>}

                  <Column field="lastYear.novemberRate"></Column>
                  <Column field="lastYear.novemberValue"></Column>
                  <Column field="lastYear.novemberUSDN"></Column>
                  <Column field="lastYear.novemberUVR"></Column>
                  
                  <Column field="lastYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.decSqMt"></Column> : <Column field="lastYear.decMt"></Column>}

                  <Column field="lastYear.decemberRate"></Column>
                  <Column field="lastYear.decemberValue"></Column>
                  <Column field="lastYear.decemberUSDN"></Column>
                  <Column field="lastYear.decemberUVR"></Column>
                  
                  <Column field="lastYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.janSqMt"></Column> : <Column field="lastYear.janMt"></Column>}

                  <Column field="lastYear.januaryRate"></Column>
                  <Column field="lastYear.januaryValue"></Column>
                  <Column field="lastYear.januaryUSDN"></Column>
                  <Column field="lastYear.januaryUVR"></Column>
                  
                  <Column field="lastYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.febSqMt"></Column> : <Column field="lastYear.febMt"></Column>}

                  <Column field="lastYear.februaryRate"></Column>
                  <Column field="lastYear.februaryValue"></Column>
                  <Column field="lastYear.februaryUSDN"></Column>
                  <Column field="lastYear.februaryUVR"></Column>
                  
                  <Column field="lastYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="lastYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="lastYear.marchSqMt"></Column> : <Column field="lastYear.marMt"></Column>}

                  <Column field="lastYear.marchRate"></Column>
                  <Column field="lastYear.marchValue"></Column>
                  <Column field="lastYear.marchUSDN"></Column>
                  <Column field="lastYear.marchUVR"></Column>
                  


                  <Column field="thisYear.aprilSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.aprilQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.aprilSqMt"></Column> : <Column field="thisYear.aprilMt"></Column>}
                  <Column field="thisYear.aprilRate"></Column>
                  <Column field="thisYear.aprilValue"></Column>
                  <Column field="thisYear.aprilUSDN"></Column>
                  <Column field="thisYear.aprilUVR"></Column>
                  
                  <Column field="thisYear.maySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.mayQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.maySqMt"></Column> : <Column field="thisYear.mayMt"></Column>}
                  <Column field="thisYear.mayRate"></Column>
                  <Column field="thisYear.mayValue"></Column>
                  <Column field="thisYear.mayUSDN"></Column>
                  <Column field="thisYear.mayUVR"></Column>
                  
                  <Column field="thisYear.juneSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.juneQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.juneSqMt"></Column> : <Column field="thisYear.juneMt"></Column>}
                  <Column field="thisYear.juneRate"></Column>
                  <Column field="thisYear.juneValue"></Column>
                  <Column field="thisYear.juneUSDN"></Column>
                  <Column field="thisYear.juneUVR"></Column>
                  
                  <Column field="thisYear.julySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.julyQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.julySqMt"></Column> : <Column field="thisYear.julyMt"></Column>}
                  <Column field="thisYear.julyRate"></Column>
                  <Column field="thisYear.julyValue"></Column>
                  <Column field="thisYear.julyUSDN"></Column>
                  <Column field="thisYear.julyUVR"></Column>
                  
                  <Column field="thisYear.augustSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.augustQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.augustSqMt"></Column> : <Column field="thisYear.augMt"></Column>}
                  <Column field="thisYear.augustRate"></Column>
                  <Column field="thisYear.augustValue"></Column>
                  <Column field="thisYear.augustUSDN"></Column>
                  <Column field="thisYear.augustUVR"></Column>
                  
                  <Column field="thisYear.septemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.septemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.septemberSqMt"></Column> : <Column field="thisYear.septemberMt"></Column>}
                  <Column field="thisYear.septemberRate"></Column>
                  <Column field="thisYear.septemberValue"></Column>
                  <Column field="thisYear.septemberUSDN"></Column>
                  <Column field="thisYear.septemberUVR"></Column>
                  
                  <Column field="thisYear.octoberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.octoberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.octSqMt"></Column> : <Column field="thisYear.octMt"></Column>}
                  <Column field="thisYear.octoberRate"></Column>
                  <Column field="thisYear.octoberValue"></Column>
                  <Column field="thisYear.octoberUSDN"></Column>
                  <Column field="thisYear.octoberUVR"></Column>
                  
                  <Column field="thisYear.novemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.novemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.novSqMt"></Column> : <Column field="thisYear.novMt"></Column>}
                  <Column field="thisYear.novemberRate"></Column>
                  <Column field="thisYear.novemberValue"></Column>
                  <Column field="thisYear.novemberUSDN"></Column>
                  <Column field="thisYear.novemberUVR"></Column>
                  
                  <Column field="thisYear.decemberSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.decemberQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.decSqMt"></Column> : <Column field="thisYear.decMt"></Column>}
                  <Column field="thisYear.decemberRate"></Column>
                  <Column field="thisYear.decemberValue"></Column>
                  <Column field="thisYear.decemberUSDN"></Column>
                  <Column field="thisYear.decemberUVR"></Column>

                  <Column field="thisYear.januarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.januaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.janSqMt"></Column> : <Column field="thisYear.janMt"></Column>}
                  <Column field="thisYear.januaryRate"></Column>
                  <Column field="thisYear.januaryValue"></Column>
                  <Column field="thisYear.januaryUSDN"></Column>
                  <Column field="thisYear.januaryUVR"></Column>
                  
                  <Column field="thisYear.februarySaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.februaryQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.febSqMt"></Column> : <Column field="thisYear.febMt"></Column>}
                  <Column field="thisYear.februaryRate"></Column>
                  <Column field="thisYear.februaryValue"></Column>
                  <Column field="thisYear.februaryUSDN"></Column>
                  <Column field="thisYear.februaryUVR"></Column>
                  
                  <Column field="thisYear.marchSaleableUnit"></Column>
                  {(selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe') ? <Column field="thisYear.marchQuantity"></Column> : (selectedProduct == "Rugs" || selectedProduct == "Carpet") ? <Column field="thisYear.marchSqMt"></Column> : <Column field="thisYear.marMt"></Column>}
                  <Column field="thisYear.marchRate"></Column>
                  <Column field="thisYear.marchValue"></Column>
                  <Column field="thisYear.marchUSDN"></Column>
                  <Column field="thisYear.marchUVR"></Column>
                  

                  <Column field="thisYear.totalSU"></Column>
                  <Column field="thisYear.totalRate"></Column>
                  <Column field="thisYear.totalValue"></Column>
                  <Column field="thisYear.totalUSDN"></Column>
                  
                  {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column field="thisYear.totalKGS" /> : (selectedProduct && (selectedProduct == 'Rugs') ? <Column field="thisYear.totalSQMT" /> : <Column field="thisYear.totalMTR" />)}
                  {/* <Column field="thisYear.q1UVR"></Column>
                  <Column field="thisYear.q2UVR"></Column>
                  <Column field="thisYear.q3UVR"></Column>
                  <Column field="thisYear.q4UVR"></Column> */}
                  <Column field="thisYear.yearlyUVR"></Column>


                </DataTable> : null}
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}
