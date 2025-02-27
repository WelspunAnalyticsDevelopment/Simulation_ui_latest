import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { InputNumber } from "primereact/inputnumber";
import { Row } from "primereact/row";
import React, { useEffect, useState } from "react";
import { fetchDataApi } from "../Services/Services";
import { Simulation } from "../components/Simulation/Simulation";
import { Summary } from "../components/Summary/Summary";
import { SavePopUp } from "./SavePopUp";
import { useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { Checkbox } from 'primereact/checkbox';
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { toFormData } from "axios";
import { GetLeadlevel } from "../Services/GetLeadlevel";





const TopLevel = ({ selectedProduct, levelSimulation }) => {

  const [Level, setLevel] = useState('');
  const [customerName, setcustomerName] = useState();
  const [dataTableAnnual, setDataTableAnnual] = useState();

  const [flag, setFlag] = useState(0);
  const [loading, setLoading] = useState(false);


  const [unitHeader, setUnitHeader] = useState('');
  const [distinctSimulationData, setDistinctSimulationData] = useState();


  const years = [new Date(Date.now()).getFullYear() + "-" + parseInt(new Date(Date.now()).getFullYear() + 1), parseInt(new Date(Date.now()).getFullYear() + 1) + "-" + parseInt(new Date(Date.now()).getFullYear() + 2)];
  const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];



  const handleResetBodyGroup = (customerName, plant) => {
    return {
      customerName: customerName,
      plant: plant,
      checked: false,
      data: {
        April: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        May: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        June: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        July: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        August: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        September: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        October: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        November: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        December: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        January: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        February: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
        March: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
      }
    }
  }


  const fetchData = async () => {

    setLoading(true)
    try {

      const summaeyData = await GetLeadlevel(sessionStorage.getItem("name"), levelSimulation.name, selectedProduct.name)


      //Customer Level Simulation
      console.log("this is the fetched data", summaeyData)



      if (levelSimulation.name == 'Customer Level') {

        const simulationData = summaeyData.map(({ customerName, plant, lastYear, productSubCat, checked }) => {
          return {
            customerName: customerName,
            plant: plant,
            checked: checked,
            matcode: lastYear.matcode,
            uniqueIdentificationNo: lastYear.uniqueIdentificationNo,
            productSubCat: productSubCat,
            rowFill: false,
            columnFill: false,
            data: {
              April: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              May: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              June: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              July: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              August: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              September: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              October: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              November: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              December: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              January: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              February: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              March: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
            }
          }
        })


        setcustomerName(null);
        setDataTableAnnual(summaeyData);
        setDistinctSimulationData(simulationData)
        setLoading(false)
      }

      //Program Level Simulation 

      else if (levelSimulation.name == 'Program Level') {

        const response = summaeyData.map(({ program }) => {
          return { "customerName": program }
        });



        const simulationData = summaeyData.map(({ program, plant, lastYear, productSubCat, checked }) => {
          return {
            customerName: program,
            plant: plant,
            checked: checked,
            uniqueIdentificationNo: lastYear.uniqueIdentificationNo,
            matcode: lastYear.matcode,
            productSubCat: productSubCat,
            rowFill: false,
            columnFill: false,
            data: {
              April: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              May: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              June: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              July: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              August: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              September: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              October: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              November: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              December: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              January: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              February: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
              March: { quantity: 0, KGS: 0, rate: 0, isCheckedSU: false, isCheckedKG: false, isDisabled: false },
            }
          }
        })

        console.log("this is the simulation data", simulationData);

        // setcustomerName(response);
        setDistinctSimulationData(simulationData);
        setDataTableAnnual(summaeyData);
        setLoading(false)

      }


      // Plant Level simulation

      else if (levelSimulation.name == 'Plant Level') {
        const distinctplant = new Set();
        const plantData = []
        summaeyData.map(({ plant }) => {

          let oldValue = distinctplant.size;
          distinctplant.add(plant);
          let newValue = distinctplant.size;
          if (oldValue !== newValue) {
            return plantData.push(handleResetBodyGroup(plant))
          }
        });


        setcustomerName(plantData);

        setDataTableAnnual(summaeyData);

        setLoading(false)
      }



      // Region Level Simulation

      else if (levelSimulation.name == 'Region Level') {

        const distinctRegion = new Set();
        const regionData = []
        summaeyData.map(({ region }) => {

          let oldValue = distinctRegion.size;
          distinctRegion.add(region);
          let newValue = distinctRegion.size;
          if (oldValue !== newValue) {
            return regionData.push(handleResetBodyGroup(region))
          }
        });

        setcustomerName(regionData);
        setDataTableAnnual(summaeyData);

        setLoading(false)
      }

    }

    catch (error) {
      setLoading(false)

    }

  };


  const loginRequest = {
    scopes: ["User.Read"]
  };

  const { login, result, error } = useMsalAuthentication(InteractionType.Redirect, loginRequest);


  useEffect(() => {
    if (error) {
      login(InteractionType.Redirect, loginRequest);
    }


    if (selectedProduct != null && levelSimulation != null) {
      fetchData()
      setLevel(levelSimulation.name.split(" ")[0])

      switch (selectedProduct.name) {
        case "Rugs": setUnitHeader('SQMT')
          break;
        case "Sheets": setUnitHeader('MTR')
          break;
        case "Top of Bed": setUnitHeader('MTR')
          break;
        default: setUnitHeader('KGS(Tons)')
      }

    }


  }, [error, levelSimulation, selectedProduct]);


  if (result !== null) {
    sessionStorage.setItem("userName", /* result.account.username */ 'Keyur_Parekh@welspun.com')
    sessionStorage.setItem("name", /*result.account.name */ 'Keyur Parekh');
    // Logger.log(`User ${result.account.name} logged in ${new Date()}`)
  }


  function handleColourChange(month, rowIndex, index, prevNumbers, newNumbers, unit) {


    if (prevNumbers != null && prevNumbers != newNumbers && prevNumbers != 0 && prevNumbers != "" && prevNumbers != "0") {

      if (unit == 'SU/QTY') {
        //for saleable unit
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[77 + (index * 5)].style.backgroundColor = "yellow";
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[5 + (index * 5)].style.backgroundColor = "lightgrey";
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[149].style.backgroundColor = "yellow";

        //for quantity
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[77 + (index * 5) + 1].style.backgroundColor = "yellow";
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[5 + (index * 5) + 1].style.backgroundColor = "lightgrey";
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[153].style.backgroundColor = "yellow";
        
      }
      else if (unit == 'Rate') {
        //for saleable unit
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[77 + (index * 5) + 2].style.backgroundColor = "lightgreen";
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[5 + (index * 5) + 2].style.backgroundColor = "lightgrey";
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[150].style.backgroundColor = "lightgreen";
      }
      //for Value
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[77 + (index * 6) + 3].style.backgroundColor = "lightblue";
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[5 + (index * 6) + 3].style.backgroundColor = "lightgrey";
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[151].style.backgroundColor = "lightblue";


      //for USDN
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[77 + (index * 6) + 4].style.backgroundColor = "lightblue";
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[5 + (index * 6) + 4].style.backgroundColor = "lightgrey";
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[152].style.backgroundColor = "lightblue";

      //for UVR
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[77 + (index * 6) + 5].style.backgroundColor = "lightblue";
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[5 + (index * 6) + 5].style.backgroundColor = "lightgrey";
      document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[154].style.backgroundColor = "lightblue";

      // // for Quaterly UVR
      // document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[153].style.backgroundColor = "lightblue";
      // document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[154].style.backgroundColor = "lightblue";
      // document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[155].style.backgroundColor = "lightblue";
      // document.getElementsByTagName("table")[0].getElementsByTagName("tr")[3 + rowIndex].getElementsByTagName("td")[156].style.backgroundColor = "lightblue";


    }
    
  }




  //Calculation functions for the simulation

  const handleFormSubmit = (event) => {

    let tableDataInfo = document.getElementsByTagName("table")[1].getElementsByTagName("tr")
    let rowsData = []

    if (levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') {

      for (let i = 1; i < tableDataInfo.length; i++) {

        let rowObject = new Object();
        let customerName = tableDataInfo[i].getElementsByTagName("td")[0].innerText
        let plant = tableDataInfo[i].getElementsByTagName("td")[1].innerText
        let monthCount = 6
        rowObject["customerName"] = customerName
        rowObject["plant"] = plant
        rowObject["checked"] = tableDataInfo[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].checked
        rowObject["uniqueIdentificationNo"] = tableDataInfo[i].getElementsByTagName("td")[4].getElementsByTagName("div")[2].id
        let customerObject = new Object();

        for (let j = 6; j < tableDataInfo[i].getElementsByTagName("td").length; j++) {

          let month = tableDataInfo[0].getElementsByTagName("th")[monthCount].innerText
          monthCount++

          let quantity = tableDataInfo[i].getElementsByTagName("td")[j].getElementsByTagName("input")[0].getAttribute("aria-valuenow")
          let KGS = tableDataInfo[i].getElementsByTagName("td")[j].getElementsByTagName("input")[1].getAttribute("aria-valuenow")
          let rate = tableDataInfo[i].getElementsByTagName("td")[j].getElementsByTagName("input")[2].getAttribute("aria-valuenow")
          customerObject[month] = { "quantity": parseInt(quantity), "KGS": parseInt(KGS), "rate": parseInt(rate) }
        }

        rowObject["data"] = customerObject
        rowsData.push(rowObject)
      }

      setDataTableAnnual((prevData) => {
        
        return prevData.map((item, rowIndex) => {

          let customerData = null;
          if (levelSimulation.name == 'Customer Level') {
            customerData = rowsData.find((e) => (e.uniqueIdentificationNo === item.lastYear.uniqueIdentificationNo));
          }
          else {
            customerData = rowsData.find((e) => (e.uniqueIdentificationNo === item.lastYear.uniqueIdentificationNo));
          }
        
          let calculatedQuantity = 0;
          let calculatedRate = 0;
          let calculatedKGS = 0;
          let calculatedSqMt = 0;
          let calculatedMt = 0;
          let calculatedValue = 0;
          let calculatedUSDN = 0;
          let calculatedUVR = 0;
          let weightedRate = 0;
          let totalQuantity = 0;
          let totalRate = 0;
          let totalKGS = 0;
          try {
            months.forEach((month, index) => {
              // console.log("this is month",month,index,item.thisYear[month.toLowerCase() + 'Quantity'])
              totalQuantity = customerData.data[month]?.quantity || 0;
              totalRate = customerData.data[month]?.rate || 0;

              totalKGS = customerData.data[month]?.KGS || 0;
              

              if (customerData.checked) {
                
                if (selectedProduct.name == 'Terry Towel' || selectedProduct.name == 'Bathrobe') {
                  
                  let prevQuantity = parseFloat(item.thisYear[month.toLowerCase() + 'Quantity']);

                  let simulatedQuantity = parseFloat(item.thisYear[month.toLowerCase() + 'Quantity'] + ((item.thisYear[month.toLowerCase() + 'Quantity'] * totalKGS) / 100))

                  handleColourChange(month, rowIndex, index, prevQuantity, simulatedQuantity, "SU/QTY")

                  item.thisYear[month.toLowerCase() + 'Quantity'] = simulatedQuantity;
                  item.thisYear[month.toLowerCase() + 'Quantity'] = item.thisYear[month.toLowerCase() + 'Quantity'].toFixed(2);
                  calculatedKGS = calculatedKGS + parseFloat(item.thisYear[month.toLowerCase() + 'Quantity'])


                  let dependentSU = (simulatedQuantity * 1000) / item.lastYear.wtPerPC;
                  item.thisYear[month.toLowerCase() + 'SaleableUnit'] = parseInt(dependentSU);
                  calculatedQuantity = calculatedQuantity + parseFloat(dependentSU)

                }

              }

              else if (!customerData.checked) {

                if (selectedProduct.name == 'Terry Towel' || selectedProduct.name == 'Bathrobe') {
                  
                  let prevQty = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit']);

                  let simulatedSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                  item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedSU;
                  calculatedQuantity = calculatedQuantity + parseFloat(simulatedSU)

                  let dependentQuantity = (item.lastYear.wtPerPC * simulatedSU) / 1000;
                  item.thisYear[month.toLowerCase() + 'Quantity'] = dependentQuantity.toFixed(2);
                  calculatedKGS = calculatedKGS + parseFloat(dependentQuantity.toFixed(2))

                  handleColourChange(month, rowIndex, index, prevQty, simulatedSU, "SU/QTY")

                }

              }

              if (selectedProduct.name == 'Rugs'){
                let prevSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit']);
                let simulatedSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedSU;
                calculatedQuantity += parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'])
                handleColourChange(month, rowIndex, index, prevSU, simulatedSU, "SU/QTY")

                let prevQty = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt']);
                let simulatedQuantity = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] + ((item.thisYear[month.toLowerCase() + 'SqMt'] * totalKGS) / 100))
                item.thisYear[month.toLowerCase() + 'SqMt'] = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] + ((item.thisYear[month.toLowerCase() + 'SqMt'] * totalKGS) / 100));
                item.thisYear[month.toLowerCase() + 'SqMt'] = item.thisYear[month.toLowerCase() + 'SqMt'].toFixed(2);
                if (isNaN(item.thisYear[month.toLowerCase() + 'SqMt'])){
                  item.thisYear[month.toLowerCase() + 'SqMt'] = 0
                }
                else{
                  item.thisYear[month.toLowerCase() + 'SqMt'] = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] + ((item.thisYear[month.toLowerCase() + 'SqMt'] * totalKGS) / 100))
                }

                handleColourChange(month, rowIndex, index, prevQty, simulatedQuantity, "SU/QTY");
                calculatedSqMt += parseFloat(item.thisYear[month.toLowerCase() + 'SqMt']);
              }

              else if (selectedProduct.name == 'Top of Bed' || selectedProduct.name == 'Sheets') {

                let simulatedQuantity = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedQuantity;
                calculatedQuantity += parseInt(simulatedQuantity)

                item.thisYear[month.toLowerCase() + 'Mt'] = parseFloat(item.thisYear[month.toLowerCase() + 'Mt'] + ((item.thisYear[month.toLowerCase() + 'Mt'] * totalKGS) / 100));
                item.thisYear[month.toLowerCase() + 'Mt'] = item.thisYear[month.toLowerCase() + 'Mt'].toFixed(2);
                calculatedMt += parseFloat(item.thisYear[month.toLowerCase() + 'Mt'])
              }

              const prevRate = parseFloat(item.thisYear[month.toLowerCase() + 'Rate']);

              item.thisYear[month.toLowerCase() + 'Rate'] = parseFloat(item.thisYear[month.toLowerCase() + 'Rate'] + ((item.thisYear[month.toLowerCase() + 'Rate'] * totalRate) / 100))
              item.thisYear[month.toLowerCase() + 'Rate'] = item.thisYear[month.toLowerCase() + 'Rate'].toFixed(2);
              
              const newRate = item.thisYear[month.toLowerCase() + 'Rate'];
              calculatedRate = calculatedRate + parseFloat(item.thisYear[month.toLowerCase() + 'Rate'] + ((item.thisYear[month.toLowerCase() + 'Rate'] * totalRate) / 100));
              
              weightedRate = calculatedRate/12;

              handleColourChange(month, rowIndex, index, prevRate, newRate, "Rate");

              item.thisYear[month.toLowerCase() + 'Value'] = parseFloat((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * item.thisYear[month.toLowerCase() + 'Rate'])).toFixed(2)
              calculatedValue += parseFloat(item.thisYear[month.toLowerCase() + 'Value']);

              item.thisYear[month.toLowerCase() + 'USDN'] = item.thisYear[month.toLowerCase() + 'Value']
              calculatedUSDN += parseFloat(item.thisYear[month.toLowerCase() + 'USDN']);

              if(selectedProduct.name == 'Terry Towel' || selectedProduct.name == 'Bathrobe'){
                item.thisYear[month.toLowerCase() + 'UVR'] = (parseFloat(item.thisYear[month.toLowerCase() + 'Quantity']) !== 0.00 ? parseFloat(item.thisYear[month.toLowerCase() + 'USDN']/item.thisYear[month.toLowerCase() + 'Quantity']).toFixed(2) : 0)
                calculatedUVR = parseFloat(calculatedKGS !== 0.00) ? parseFloat(calculatedUSDN/calculatedKGS).toFixed(2): 0;
                
              }
              else if(selectedProduct.name == 'Rugs' || selectedProduct.name == 'Carpet'){
                debugger;
                let monthlyUVR = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] !== 0.00 ? parseFloat(item.thisYear[month.toLowerCase() + 'USDN']/item.thisYear[month.toLowerCase() + 'SqMt']).toFixed(2) : 0)
                if (isNaN(monthlyUVR)){
                  item.thisYear[month.toLowerCase() + 'UVR'] = monthlyUVR
                }
                else{
                  item.thisYear[month.toLowerCase() + 'UVR'] = 0;
                }

                calculatedUVR = parseFloat(calculatedSqMt !== 0.00) ? parseFloat(calculatedUSDN/calculatedSqMt).toFixed(2) : 0;  
                if(isNaN(calculatedUVR)){
                  debugger;
                  calculatedUVR = 0;
                }
              }
              else{
                item.thisYear[month.toLowerCase() + 'UVR'] = (parseFloat(item.thisYear[month.toLowerCase() + 'Mt']) !== 0.00 ? parseFloat(item.thisYear[month.toLowerCase() + 'USDN']/item.thisYear[month.toLowerCase() + 'Mt']).toFixed(2) : 0)             
                calculatedUVR += parseFloat(calculatedKGS !== 0.00) ? parseFloat(calculatedUSDN/calculatedKGS).toFixed(2) : 0        
              }

            })
            item.thisYear.totalSU = calculatedQuantity
            item.thisYear.totalRate = weightedRate.toFixed(2)
            item.thisYear.totalKGS = calculatedKGS.toFixed(2);
            item.thisYear.totalSQMT = calculatedSqMt.toFixed(2)
            item.thisYear.totalMTR = calculatedMt.toFixed(2);
            item.thisYear.totalValue = calculatedValue.toFixed(2);
            item.thisYear.totalUSDN = calculatedUSDN.toFixed(2);
            item.thisYear.yearlyUVR = calculatedUVR.toFixed(2);     
          }
          catch (error) {
            console.log(error)
          }
          return item;
        })
      })
    }

    else if (levelSimulation.name == 'Plant Level' || levelSimulation.name == 'Region Level') {


      for (let i = 1; i < tableDataInfo.length; i++) {

        let rowObject = new Object();
        let customerName = tableDataInfo[i].getElementsByTagName("td")[0].innerText
        let plant = tableDataInfo[i].getElementsByTagName("td")[1].innerText
        let monthCount = 3
        rowObject["customerName"] = customerName
        rowObject["plant"] = plant
        rowObject["checked"] = tableDataInfo[i].getElementsByTagName("td")[1].getElementsByTagName("input")[0].checked
        let customerObject = new Object();
        for (let j = 3; j < tableDataInfo[i].getElementsByTagName("td").length; j++){

          let month = tableDataInfo[0].getElementsByTagName("th")[monthCount].innerText
          monthCount++

          let quantity = tableDataInfo[i].getElementsByTagName("td")[j].getElementsByTagName("input")[0].getAttribute("aria-valuenow")
          let KGS = tableDataInfo[i].getElementsByTagName("td")[j].getElementsByTagName("input")[1].getAttribute("aria-valuenow")
          let rate = tableDataInfo[i].getElementsByTagName("td")[j].getElementsByTagName("input")[2].getAttribute("aria-valuenow")
          customerObject[month] = { "quantity": parseInt(quantity), "KGS": parseInt(KGS), "rate": parseInt(rate) }
        }
        rowObject["data"] = customerObject
        rowsData.push(rowObject)
      }


      rowsData.map((e) => {

        setDataTableAnnual((prevData) => {
          return prevData.map((item, rowIndex) => {

            let calculatedQuantity = 0;
            let calculatedRate = 0;
            let calculatedKGS = 0;
            let calculatedSqMt = 0;
            let calculatedMt = 0;
            let calculatedValue = 0;
            let calculatedUSDN = 0;
            let calculatedUVR = 0;
            let weightedRate = 0;

            let totalQuantity = 0;
            let totalRate = 0;
            let totalKGS = 0;

            if (e.customerName == item.plant || e.customerName == item.region) {
              months.forEach((month, index) => {
                totalQuantity = e.data[month]?.quantity || 0;
                totalRate = e.data[month]?.rate || 0;
                totalKGS = e.data[month]?.KGS || 0;


                if (e.checked) {

                  if (selectedProduct.name == 'Terry Towel' || selectedProduct.name == 'Bathrobe') {


                    let prevQuantity = parseFloat(item.thisYear[month.toLowerCase() + 'Quantity']);
                    let simulatedQuantity = parseFloat(item.thisYear[month.toLowerCase() + 'Quantity'] + ((item.thisYear[month.toLowerCase() + 'Quantity'] * totalKGS) / 100))
                    item.thisYear[month.toLowerCase() + 'Quantity'] = simulatedQuantity;
                    item.thisYear[month.toLowerCase() + 'Quantity'] = item.thisYear[month.toLowerCase() + 'Quantity'].toFixed(2);
                    handleColourChange(month, rowIndex, index, prevQuantity, simulatedQuantity, "SU/QTY");
                    calculatedKGS += parseInt(item.thisYear[month.toLowerCase() + 'Quantity']);

                    let dependentSU = (simulatedQuantity * 1000) / item.lastYear.wtPerPC;
                    item.thisYear[month.toLowerCase() + 'SaleableUnit'] = parseInt(dependentSU);
                    calculatedQuantity += parseInt(dependentSU);
                  }

                  else if (selectedProduct.name == 'Rugs') {

                    let simulatedQuantity = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                    item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedQuantity;

                    item.thisYear[month.toLowerCase() + 'SqMt'] = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] + ((item.thisYear[month.toLowerCase() + 'SqMt'] * totalKGS) / 100));
                    item.thisYear[month.toLowerCase() + 'SqMt'] = item.thisYear[month.toLowerCase() + 'SqMt'].toFixed(2);
                  }

                  else if (selectedProduct.name == 'Top of Bed' || selectedProduct.name == 'Sheets') {

                    let simulatedQuantity = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                    item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedQuantity;

                    item.thisYear[month.toLowerCase() + 'Mt'] = parseFloat(item.thisYear[month.toLowerCase() + 'Mt'] + ((item.thisYear[month.toLowerCase() + 'Mt'] * totalKGS) / 100));
                    item.thisYear[month.toLowerCase() + 'Mt'] = item.thisYear[month.toLowerCase() + 'Mt'].toFixed(2);
                  }

                }
                else if (!e.checked) {

                  if (selectedProduct.name == 'Terry Towel' || selectedProduct.name == 'Bathrobe') {

                    let prevSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit']);
                    let simulatedSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                    item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedSU;
                    calculatedQuantity += parseInt(simulatedSU)

                    let dependentQuantity = (item.lastYear.wtPerPC * simulatedSU) / 1000;
                    item.thisYear[month.toLowerCase() + 'Quantity'] = dependentQuantity.toFixed(2);
                    calculatedKGS = calculatedKGS + parseFloat(dependentQuantity);

                    handleColourChange(month, rowIndex, index, prevSU, simulatedSU, "SU/QTY")

                  }

                  else if (selectedProduct.name == 'Rugs') {

                    let prevSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit']);
                    let simulatedSU = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                    item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedQuantity;
                    calculatedQuantity += parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'])

                    handleColourChange(month, rowIndex, index, prevSU, simulatedSU, "SU/QTY");

                    let prevQty = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt']);
                    let simulatedQuantity = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] + ((item.thisYear[month.toLowerCase() + 'SqMt'] * totalKGS) / 100))
                    item.thisYear[month.toLowerCase() + 'SqMt'] = parseFloat(item.thisYear[month.toLowerCase() + 'SqMt'] + ((item.thisYear[month.toLowerCase() + 'SqMt'] * totalKGS) / 100));
                    item.thisYear[month.toLowerCase() + 'SqMt'] = item.thisYear[month.toLowerCase() + 'SqMt'].toFixed(2);
                    handleColourChange(month, rowIndex, index, prevQty, simulatedQuantity, "SU/QTY");
                    calculatedSqMt = parseInt(item.thisYear[month.toLowerCase() + 'SqMt']);
                  }

                  else if (selectedProduct.name == 'Top of Bed' || selectedProduct.name == 'Sheets') {

                    let simulatedQuantity = parseInt(item.thisYear[month.toLowerCase() + 'SaleableUnit'] + ((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * totalQuantity) / 100));
                    item.thisYear[month.toLowerCase() + 'SaleableUnit'] = simulatedQuantity;
                    calculatedQuantity += parseInt(simulatedQuantity)

                    item.thisYear[month.toLowerCase() + 'Mt'] = parseFloat(item.thisYear[month.toLowerCase() + 'Mt'] + ((item.thisYear[month.toLowerCase() + 'Mt'] * totalKGS) / 100));
                    item.thisYear[month.toLowerCase() + 'Mt'] = item.thisYear[month.toLowerCase() + 'Mt'].toFixed(2);
                    calculatedMt += parseInt(item.thisYear[month.toLowerCase() + 'Mt'])
                  }

                }

                let prevRate = parseFloat(item.thisYear[month.toLowerCase() + 'Rate']);

                item.thisYear[month.toLowerCase() + 'Rate'] = parseFloat(item.thisYear[month.toLowerCase() + 'Rate'] + ((item.thisYear[month.toLowerCase() + 'Rate'] * totalRate) / 100))
                item.thisYear[month.toLowerCase() + 'Rate'] = item.thisYear[month.toLowerCase() + 'Rate'].toFixed(2);
                let newRate = item.thisYear[month.toLowerCase() + 'Rate'];
                calculatedRate += parseFloat(item.thisYear[month.toLowerCase() + 'Rate'] + ((item.thisYear[month.toLowerCase() + 'Rate'] * totalRate) / 100));
                weightedRate = calculatedRate/12;
                
                handleColourChange(month, rowIndex, index, prevRate, newRate, "Rate");


                item.thisYear[month.toLowerCase() + 'Value'] = parseFloat((item.thisYear[month.toLowerCase() + 'SaleableUnit'] * item.thisYear[month.toLowerCase() + 'Rate'])).toFixed(2)
                calculatedValue += parseFloat(item.thisYear[month.toLowerCase() + 'Value']);
                item.thisYear[month.toLowerCase() + 'USDN'] = item.thisYear[month.toLowerCase() + 'Value']
                calculatedUSDN += parseInt(item.thisYear[month.toLowerCase() + 'USDN']);

                item.thisYear[month.toLowerCase() + 'UVR'] = (parseFloat(item.thisYear[month.toLowerCase() + 'quantity']) !== 0.00 ? parseFloat(item.thisYear[month.toLowerCase() + 'USDN']/item.thisYear[month.toLowerCase() + 'Quantity']).toFixed(2) : 0)
                // calculatedUVR += parseFloat(calculatedKGS !== 0.00) ? parseFloat(calculatedUSDN/calculatedKGS).toFixed(2) : 0
              })
              item.thisYear.totalSU = calculatedQuantity
              item.thisYear.totalRate = weightedRate.toFixed(2);
              item.thisYear.totalKGS = calculatedKGS;
              item.thisYear.totalSQMT = calculatedSqMt.toFixed(2);
              item.thisYear.totalMTR = calculatedMt.toFixed(2);
              item.thisYear.totalValue = calculatedValue.toFixed(2);
              item.thisYear.totalUSDN = calculatedUSDN.toFixed(2);
              if(calculatedUVR != NaN){
                item.thisYear.yearlyUVR = calculatedUVR
              }
              else{
                item.thisYear.yearlyUVR = 0.00
              }
            }
            return item;
          })

        })
      })
    }


  };





  //Functions to Save the data

  const [savedData, setSavedData] = useState(dataTableAnnual);


  const handleSaveData = () => {
    try {

      setSavedData(dataTableAnnual.map(({ customerName, region, plant, lastYear, thisYear, wtPerPC }) => ({
        customerName: customerName,
        region: region,
        plant: plant,
        thisYear: thisYear,
        matcode: lastYear.matcode,
        wtPerPC: wtPerPC
      })))

      console.log("this is the datatableannual to be saved", dataTableAnnual)

    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  const [showDialog, setShowDialog] = useState(false);


  const saveSimulation = () => {
    setShowDialog(true);
    setFlag(0);
    handleSaveData();
  }

  const handleCloseDialog = () => {

    setShowDialog(false);

  };




  const items = ["Saleable Unit", `${unitHeader}`, "Rate", "Value", "USDN", "UVR"]


  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header={"Customer Name"} field="customerName" sortable scrollable frozen filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} rowSpan={3} />
        <Column header={"Program Name"} field="program" scrollable frozen rowSpan={3}/> 
        {(levelSimulation && (levelSimulation.name == 'Plant Level' || levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level')) ? <Column header={"Plant"} field="plant" scrollable frozen style={{ minWidth: '4rem' }} rowSpan={3} /> : <Column header={"Region"} field="plant" scrollable frozen style={{ minWidth: '4rem' }} rowSpan={3} />}
        <Column header={"Set"} field="productSubCat" scrollable frozen style={{ width: '1rem' }} rowSpan={3} />
        <Column header={"Matcode"} field="matcode" frozen rowSpan={3}/>
        {years.map((year) => (
          <Column key={year} header={year} colSpan={72} />
        ))}
        <Column header={"Total SU"} field="totalSU" rowSpan={3} />
        <Column header={"Rate"} field="totalRate" rowSpan={3} />
        <Column header={"Total Value"} field="totalValue" rowSpan={3} />
        <Column header={"Total USDN"} field="totalUSDN" rowSpan={3} />
        {(selectedProduct && (selectedProduct.name == 'Terry Towel' || selectedProduct.name == 'Bathrobe')) ? <Column header={`Total ${unitHeader}`} field="totalKGS" rowSpan={3} /> : (selectedProduct && (selectedProduct.name == 'Rugs') ? <Column header={`Total ${unitHeader}`} field="totalSQMT" rowSpan={3} /> : <Column header={`Total ${unitHeader}`} field="totalMTR" rowSpan={3} />)}
        {/* <Column header={"Q1 UVR"} field="q1UVR" rowSpan={3}/>
        <Column header={"Q2 UVR"} field="q2UVR" rowSpan={3}/>
        <Column header={"Q3 UVR"} field="q3UVR" rowSpan={3}/>
        <Column header={"Q4 UVR"} field="q4UVR" rowSpan={3}/> */}
        <Column header={"Yearly UVR"} field="yearlyUVR" rowSpan={3}/>
      </Row>

      <Row>
        {years.map((year) => (
          months.map((month) => (
            <Column key={year + month} header={month} colSpan={6} />
          ))))}
      </Row>

      <Row>
        {years.map((year) => (
          months.map((month) => (
            items.map((item) => (
              <Column key={year + month + item} header={item} />
            ))
          ))
        ))}
      </Row>
    </ColumnGroup>
  );


  const columnTotal = (unitHeader) => {

    let lastTotal = 0;
    let columns = unitHeader.split(".")

    if (dataTableAnnual && dataTableAnnual.length > 0) {
      dataTableAnnual.map((item) => {
        lastTotal = Math.round(parseFloat(lastTotal), 2) + Math.round(parseFloat(item[columns[0]][columns[1]]), 2);
        lastTotal = Math.round(lastTotal, 2);
      })
    }
    return lastTotal;

  }



  const footerGroup = (selectedProduct) => (
    <ColumnGroup>
      <Row>
        <Column footer="Totals:" colSpan={5} frozen footerStyle={{ textAlign: 'center' }}></Column>
        <Column footer={columnTotal("lastYear.aprilSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.aprilQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.aprilSqMt")}></Column> : <Column footer={columnTotal("lastYear.aprilMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("lastYear.aprilValue")}></Column>
        <Column footer={columnTotal("lastYear.aprilUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.maySaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.mayQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.maySqMt")}></Column> : <Column field="lastYear.mayMt"></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.mayValue")}></Column>
        <Column footer={columnTotal("lastYear.mayUSDN")}></Column>
        <Column></Column>
        <Column footer={columnTotal("lastYear.juneSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.juneQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.juneSqMt")}></Column> : <Column footer={columnTotal("lastYear.juneMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.juneValue")}></Column>
        <Column footer={columnTotal("lastYear.juneUSDN")}></Column>
        <Column></Column>
        <Column footer={columnTotal("lastYear.julySaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.julyQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.julySqMt")}></Column> : <Column footer={columnTotal("lastYear.julyMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.julyValue")}></Column>
        <Column footer={columnTotal("lastYear.julyUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.augustSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.augustQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.augustSqMt")}></Column> : <Column footer={columnTotal("lastYear.augMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.augustValue")}></Column>
        <Column footer={columnTotal("lastYear.augustUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.septemberSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.septemberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.septemberSqMt")}></Column> : <Column footer={columnTotal("lastYear.septemberMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.septemberValue")}></Column>
        <Column footer={columnTotal("lastYear.septemberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.octoberSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.octoberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.octSqMt")}></Column> : <Column footer={columnTotal("lastYear.octMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.octoberValue")}></Column>
        <Column footer={columnTotal("lastYear.octoberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.novemberSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.novemberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.novSqMt")}></Column> : <Column footer={columnTotal("lastYear.novMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.novemberValue")}></Column>
        <Column footer={columnTotal("lastYear.novemberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.decemberSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.decemberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.decSqMt")}></Column> : <Column footer={columnTotal("lastYear.decMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("lastYear.decemberValue")}></Column>
        <Column footer={columnTotal("lastYear.decemberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.januarySaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.januaryQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.janSqMt")}></Column> : <Column footer={columnTotal("lastYear.janMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("lastYear.januaryValue")}></Column>
        <Column footer={columnTotal("lastYear.januaryUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.februarySaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.februaryQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.febSqMt")}></Column> : <Column footer={columnTotal("lastYear.febMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("lastYear.februaryValue")}></Column>
        <Column footer={columnTotal("lastYear.februaryUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("lastYear.marchSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("lastYear.marchQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("lastYear.marchSqMt")}></Column> : <Column footer={columnTotal("lastYear.marMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("lastYear.marchValue")}></Column>
        <Column footer={columnTotal("lastYear.marchUSDN")}></Column>
        <Column></Column>

        {/* This Year columns */}

        <Column footer={columnTotal("thisYear.aprilSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.aprilQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.aprilSqMt")}></Column> : <Column footer={columnTotal("thisYear.aprilMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.aprilValue")}></Column>
        <Column footer={columnTotal("thisYear.aprilUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.maySaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.mayQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.maySqMt")}></Column> : <Column footer={columnTotal("thisYear.mayMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.mayValue")}></Column>
        <Column footer={columnTotal("thisYear.mayUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.juneSaleableUnit")}></Column>

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.juneQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.juneSqMt")}></Column> : <Column footer={columnTotal("thisYear.juneMt")}></Column>}
        <Column ></Column>
        <Column footer={columnTotal("thisYear.juneValue")}></Column>
        <Column footer={columnTotal("thisYear.juneUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.julySaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.julyQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.julySqMt")}></Column> : <Column footer={columnTotal("thisYear.julyMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.julyValue")}></Column>
        <Column footer={columnTotal("thisYear.julyUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.augustSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.augustQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.augustSqMt")}></Column> : <Column footer={columnTotal("thisYear.augMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.augustValue")}></Column>
        <Column footer={columnTotal("thisYear.augustUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.septemberSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.septemberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.septemberSqMt")}></Column> : <Column footer={columnTotal("thisYear.septemberMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.septemberValue")}></Column>
        <Column footer={columnTotal("thisYear.septemberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.octoberSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.octoberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.octSqMt")}></Column> : <Column footer={columnTotal("thisYear.octMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.octoberValue")}></Column>
        <Column footer={columnTotal("thisYear.octoberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.novemberSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.novemberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.novSqMt")}></Column> : <Column footer={columnTotal("thisYear.novMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.novemberValue")}></Column>
        <Column footer={columnTotal("thisYear.novemberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.decemberSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.decemberQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.decSqMt")}></Column> : <Column footer={columnTotal("thisYear.decMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.decemberValue")}></Column>
        <Column footer={columnTotal("thisYear.decemberUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.januarySaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.januaryQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.janSqMt")}></Column> : <Column footer={columnTotal("thisYear.janMt")}></Column>}

        <Column></Column>
        <Column footer={columnTotal("thisYear.januaryValue")}></Column>
        <Column footer={columnTotal("thisYear.januaryUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.februarySaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.februaryQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.febSqMt")}></Column> : <Column footer={columnTotal("thisYear.febMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.februaryValue")}></Column>
        <Column footer={columnTotal("thisYear.februaryUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.marchSaleableUnit")}></Column>
        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.marchQuantity")}></Column> : selectedProduct == "Rugs" ? <Column footer={columnTotal("thisYear.marchSqMt")}></Column> : <Column footer={columnTotal("thisYear.marMt")}></Column>}
        <Column></Column>
        <Column footer={columnTotal("thisYear.marchValue")}></Column>
        <Column footer={columnTotal("thisYear.marchUSDN")}></Column>
        <Column></Column>

        <Column footer={columnTotal("thisYear.totalSU")}></Column>
        <Column></Column>
        <Column footer={columnTotal("thisYear.totalValue")}></Column>
        <Column footer={columnTotal("thisYear.totalUSDN")}></Column>
      

        {(selectedProduct && (selectedProduct == 'Terry Towel' || selectedProduct == 'Bathrobe')) ? <Column footer={columnTotal("thisYear.totalKGS")} /> : (selectedProduct && (selectedProduct == 'Rugs') ? <Column footer={columnTotal("thisYear.totalSQMT")} /> : <Column footer={columnTotal("thisYear.totalMTR")} />)}

        <Column></Column>
        
      </Row>
    </ColumnGroup>
  );



  const headerGroupqty = (
    <ColumnGroup>
      <Row>
        <Column field="customerName" header={Level + " Name"} sortable frozen filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} rowSpan={3} />
        {levelSimulation && levelSimulation.name == "Customer Level" || levelSimulation && levelSimulation.name == "Program Level" ? <Column field="plant" header="Plant" frozen style={{ minWidth: '4rem' }} rowSpan={3} /> : null}
        {levelSimulation && levelSimulation.name == "Customer Level" || levelSimulation && levelSimulation.name == "Program Level" ? <Column field="productSubCat" header='Set' frozen style={{ width: '1rem' }} rowSpan={3} /> : null}
        {levelSimulation && levelSimulation.name == "Customer Level" || levelSimulation && levelSimulation.name == "Program Level" ? <Column field="matcode" header='Matcode' sortable frozen filter filterPlaceholder="Search by name" style={{ width: '1rem' }} rowSpan={3} /> : null}
        <Column field="Check" header="Check" style={{ minWidth: '5rem' }} rowSpan={3} />
        <Column field="PopulateColumns" header="Populate Columns" style={{ minWidth: '5rem' }} rowSpan={3} />
        {months.map((item) => (
          <Column style={{ minWidth: '7rem' }} key={item} header={item} ></Column>

        ))}
      </Row>

    </ColumnGroup>
  )

  const handleReset = () => {
    setcustomerName(null)
    setDataTableAnnual(null)
    setFlag(0);
    fetchData();

    // TODO : reset simulation table
  };


  const qtyBodyGroup = (data, month) => {
    debugger;
    let tooltipUnit = `Enter your ${unitHeader}`

    return (
      <div id={data.uniqueIdentificationNo} className="grid">
        <div className="col-12">

          <InputNumber
            id="quantity"
            tooltip="Enter your Saleable Units" tooltipOptions={{ position: 'bottom' }}
            placeholder="SU"
            suffix="%"
            size={4}
            value={0}
            disabled={data.checked || data.data[month].isDisabled}
            onBlur={month == 'April' ? (e) => rowFillData(data) : null}
          />


        </div>

        <div className="col-12">

          <InputNumber
            id="kgs"
            tooltip={tooltipUnit} tooltipOptions={{ position: 'bottom' }}
            placeholder={unitHeader}
            suffix="%"
            size={4}
            value={0}
            disabled={!data.checked || data.data[month].isDisabled}
            onBlur={month == 'April' ? (e) => rowFillData(data) : null}
          />

        </div>

        <div className="col-12">
          <InputNumber
            id="rate"
            tooltip="Enter your Rate" tooltipOptions={{ position: 'bottom' }}
            placeholder="Rate"
            suffix="%"
            size={4}
            value={0}
            disabled={data.data[month].isDisabled}
            onBlur={month == 'April' ? (e) => rowFillData(data) : null}
          />
        </div>

      </div>
    );

  }



  const rowFillData = (e) => {
    let rowIndex
    if (dataTableAnnual.length == document.getElementsByTagName("table")[1].getElementsByTagName("tr").length - 1) {
      rowIndex = dataTableAnnual.findIndex(element => element.lastYear.uniqueIdentificationNo == e.uniqueIdentificationNo) + 1;
    } else {
      debugger;
      let tableItem = document.getElementsByTagName("table")[1].getElementsByTagName("tr")
      let i;
      for (i = 0; i <= tableItem.length; i++) {
        debugger;
        let tableLength = tableItem[i].getElementsByTagName("td")
        if (tableLength.length >= 3) {
          let uniqueCustomer = tableLength[0].innerHTML
          if (e.customerName == uniqueCustomer) {
            rowIndex = i
            break;
          }
        }
      }
    }
    if (e.rowFill) {
      let su;
      let kgs;
      let rate;
      if (levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') {
        su = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[6].getElementsByTagName("input")[0].value
        kgs = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[6].getElementsByTagName("input")[1].value
        rate = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[6].getElementsByTagName("input")[2].value
        for (let i = 7; i < 17; i++) {
          console.log(i, "i")
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value = su
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].value = kgs
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].value = rate
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].ariaValueNow = su
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].ariaValueNow = kgs
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].ariaValueNow = rate
        }
      } else {
        su = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[3].getElementsByTagName("input")[0].value
        kgs = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[3].getElementsByTagName("input")[1].value
        rate = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[3].getElementsByTagName("input")[2].value
        for (let i = 3; i < 15; i++) {
          console.log(i, "i")
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value = su
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].value = kgs
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].value = rate
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].ariaValueNow = su
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].ariaValueNow = kgs
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].ariaValueNow = rate
        }
      }
    }
    else {
      if (levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') {
        for (let i = 7; i < 17; i++) {
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].value = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].value = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].ariaValueNow = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].ariaValueNow = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].ariaValueNow = '0%'
        }
      } else {
        debugger;
        for (let i = 4; i < 15; i++) {
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].value = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].value = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[0].ariaValueNow = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[1].ariaValueNow = '0%'
          document.getElementsByTagName("table")[1].getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[i].getElementsByTagName("input")[2].ariaValueNow = '0%'
        }
      }
    }
  }


  const handleCustomerCheckToggle = (uniqueIdentificationNo, checked) => {

    setDistinctSimulationData(prevDataTable => {
      let index;
      if (levelSimulation.name != 'Program Level') {
        index = prevDataTable.findIndex(element => element.uniqueIdentificationNo == uniqueIdentificationNo);
      }
      else {

        index = prevDataTable.findIndex(element => element.uniqueIdentificationNo == uniqueIdentificationNo);
      }
      const newItems = [...prevDataTable];
      // Update the item at the specified index
      newItems[index].checked = checked;
      return newItems
    })
  }

  const handlePlantCheckToggle = (plant, checked) => {

    setcustomerName(prevCustomerName => {
      const index = prevCustomerName.findIndex(element => element.customerName == plant);
      const newItems = [...prevCustomerName];
      // Update the item at the specified index
      newItems[index].checked = checked;
      return newItems;
    })
  }


  const CheckBodyGroup = (data) => {

    return (
      <div class='grid'>
        <div class='col-12' style={{ zIndex: 0 }}>
          Qty:<Checkbox id={data.uniqueIdentificationNo} onChange={(e) => {
            if (levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') {
              handleCustomerCheckToggle(data.uniqueIdentificationNo, e.checked)
            }
            else {

              handlePlantCheckToggle(data.customerName, e.checked)
            }
          }}
            checked={data.checked}
            style={{ marginTop: '1rem' }}></Checkbox>
        </div>
      </div>
    );
  }


  const handlePopulateColumns = (populateCheck, uniqueIdentificationNo, plant) => {
    console.log("inside populate columns")
    if (levelSimulation.name !== 'Plant Level' && levelSimulation.name !== 'Region Level') {
      setDistinctSimulationData(prevDataTable => {
        let index;
        index = prevDataTable.findIndex(element => element.uniqueIdentificationNo == uniqueIdentificationNo);

        const newItems = [...prevDataTable];
        months.map((item) => {
          if (item != 'April') {

            newItems[index].rowFill = !newItems[index].rowFill
            newItems[index].data[item].isDisabled = !newItems[index].data[item].isDisabled
          }
          rowFillData(newItems[index])
        })

        // Update the item at the specified index

        return newItems
      })
    } else {
      setcustomerName(prevCustomer => {
        debugger;
        let name = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerText
        let index;
        index = prevCustomer.findIndex(element => element.customerName == plant);
        const newItems = [...prevCustomer];
        debugger;
        months.map((item) => {
          if (item != 'April') {
            newItems[index].rowFill = !newItems[index].rowFill
            newItems[index].data[item].isDisabled = !newItems[index].data[item].isDisabled
          }
          rowFillData(newItems[index])
        })
        return newItems
      })
    }
  }

  const [populateCheck, setPopulateCheck] = useState(false);


  const populateBodyGroup = (data) => {
    debugger;
    return (
      <div class='grid'>
        <div class='col-12' style={{ zIndex: 0 }}>
          Row : <Checkbox id={data.uniqueIdentificationNo} onClick={(e) => {
            debugger;
            handlePopulateColumns(populateCheck, e.target.id, data.customerName)
          }

          }
            checked={data.rowFill}
          ></Checkbox>
        </div>
      </div>
    );
  }








  return (
    <>
      <div className="grid">

        <h1 className="col-md-12 text-center text-color-secondary ml-4">Business Level Simulation</h1>

        <div className="col-12">
          {dataTableAnnual && selectedProduct != null ?
            <Summary
              dataTableAnnual={dataTableAnnual} headerGroup={headerGroup} footerGroup={footerGroup(selectedProduct.name)} loading={loading} selectedProduct={selectedProduct.name}
              levelSimulation={levelSimulation} currentUrl={window.location.href.split("/")} /> : null
          }
        </div>

        <div className='col-12'>
          <Button style={{ marginLeft: '10px' }} label="Save" severity="success" onClick={dataTableAnnual && dataTableAnnual.length > 0 ? saveSimulation : null} />
          <SavePopUp
            showDialog={showDialog}
            handleCloseDialog={handleCloseDialog}
            dataTableAnnual={savedData} />
        </div>


        <h1 className="col-md-4 text-center text-color-secondary ml-4">Simulation Base Fields</h1>

        <div className="col-12">
          {dataTableAnnual ?
            <Simulation headerGroupqty={headerGroupqty} bodyGroup={qtyBodyGroup} months={months} CheckBodyGroup={CheckBodyGroup} populateBodyGroup={populateBodyGroup}
              dataTableAnnual={(levelSimulation.name == 'Customer Level' || levelSimulation.name == 'Program Level') ? distinctSimulationData : customerName}
              handleFormSubmit={handleFormSubmit} handleReset={handleReset} flag={flag} setFlag={setFlag} loading={loading} selectedProduct={selectedProduct.name}
              levelSimulation={levelSimulation.name} /> : null}
        </div>

      </div>
    </>
  );
};

export default TopLevel;
