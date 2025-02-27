import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Summary } from '../components/Summary/Summary';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { fetchSavedDataApi } from '../Services/SaveData';
import axios from 'axios';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import { pushLog } from '../Services/pushLog';

export const About = ({ selectedProduct }) => {


  const [version, setVersion] = useState('');
  const [versionList, setVersionList] = useState([]);

  const [chartData1, setChartData1] = useState({});
  const [chartOptions1, setChartOptions1] = useState({});

  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});

  const [chartData3, setChartData3] = useState({});
  const [chartOptions3, setChartOptions3] = useState({});

  const [dataTableAnnual, setDataTableAnnual] = useState();

  const [unitHeader, setUnitHeader] = useState('');


  //for checking duplicate version
  const [visibleDuplicatePublish, setVisibleDuplicatePublish] = useState(false);

  //current url for summary component
  let currentUrl = '';
  
  const loginRequest = {
    scopes: ["User.Read"]
  };

  const { login, result, error } = useMsalAuthentication(InteractionType.Redirect, loginRequest);
  
  useEffect(() => {

    const getSavedVersion = async () => {
      debugger;
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/getVersion?userName=${sessionStorage.getItem("userName")}&product=${selectedProduct.name}`);
        const versions = response.data.map(item => ({
          name: `${item.VERSION_NO}`,
          isPublished: `${item.isPublished}` // Make sure this property exists in your data
        }));
        setVersionList(versions);


      } catch (error) {
        pushLog("verbose","getSavedVersion",sessionStorage.getItem('name'),"Error fetching all the functions")
        console.log("Error:", error);
      }
    }


    if (selectedProduct !== null) {
      getSavedVersion()

      switch (selectedProduct.name) {
        case "Rugs": setUnitHeader('SQMT')
          break;
        case "Carpet": setUnitHeader('SQMT')
          break;
        case "Sheets": setUnitHeader('MTR')
          break;
        case "Top of Bed": setUnitHeader('MTR')
          break;
        default: setUnitHeader('KGS')
      }

    }


    //url path for summary component

    currentUrl = window.location.href.split("/")
    currentUrl = currentUrl[currentUrl.length - 1];

  }, [selectedProduct]);

  if (result !== null) {
    sessionStorage.setItem("userName", result.account.username /*'Avinash_Malani@welspun.com' */)
    sessionStorage.setItem("name", result.account.name /*'AVINASH MALANI' */);
  }

  const months = [
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March'
  ]

  const saleheaders = [
    'Saleable Unit',
    unitHeader,
    'Rate',
    'Value',
    'USDN'
  ]

  const headerGroup = (
    <ColumnGroup>

      <Row>
        {/* <Column header={'Customer Name'} field='Customer Name' sortable frozen filter filterPlaceholder='search by Name' style={{ minWidth: '12rem' }} rowSpan={2} /> */}
        <Column header={'Customer Name'} field="customerName" sortable frozen filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} rowSpan={2} />
        {months.map((item) => (
          <Column key={item} header={item} colSpan={5} />
        ))}
      </Row>

      <Row>
        {months.map((item) => (
          saleheaders.map((item) => (
            <Column key={item} header={item} />
          ))
        ))}
      </Row>
    </ColumnGroup>
  )


  const simulationBodyGroup = (rowData, field) => {

    if (rowData) {
      const data = field.split(".");
      if (data.length === 1) {
        return `${rowData[field]}`;
      } else {
        return `${rowData[data[0]][data[1]]}`;
      }
    }
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {

      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const exportToExcel = () => {
    import('xlsx').then((xlsx) => {

      const tableData = dataTableAnnual.map((item) => {
        const data = new Object();
        data["customerName"] = item.customerName;
        return Object.assign(data, { ...item["thisYear"] })
      })
      const worksheet = xlsx.utils.json_to_sheet(tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, version.name);
    });
  };


  const fetchData = async (item) => {
    try {


      const apiData = await fetchSavedDataApi(item.name);
      
      console.log("this is the fetched data from the simulation output",apiData)

      await setDataTableAnnual(apiData.map(({ customerName, plant , region , thisYear , productSubCat}) => ({
        customerName: customerName,
        plant : plant,
        region : region,        
        thisYear: thisYear,
        productSubCat: productSubCat,
      })))
      console.log("this is the datatable fetched from the simulation output",dataTableAnnual)
    
    } catch (error) {
      pushLog("verbose","fetchData",sessionStorage.getItem('name'),"Error fetching saved data")
      console.log('Error in component:', error);
    }

  };

  //Bar chart for total saleable Unit and total values 

  const fetchGraphData = async (version) => {
    let graph2 = [];
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/barCharData?version=${version}&userName=${sessionStorage.getItem('name')}`)
      graph2 = response.data;

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      const data2 = {
        labels: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'],
        datasets: [
          {
            type: 'line',
            label: '2024-2025 Total Values',
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.9,
            data: response.data.oldValues
          },
          {
            type: 'line',
            label: '2025-2026 Total Values',
            borderColor: documentStyle.getPropertyValue('--red-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: response.data.newValues
          },
          {
            type: 'bar',
            label: '2024-2025 Total Saleable Unit',
            backgroundColor: documentStyle.getPropertyValue('--blue-700'),
            data: response.data.oldSaleableUnit,
            borderColor: 'white',
            borderWidth: 2
          },
          {
            type: 'bar',
            label: '2025-2026 Total Saleable Unit',
            backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
            borderWidth: 2,
            borderColor: 'white',
            data: response.data.newSaleableUnit
          },
        ]
      }

      const options2 = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };

      setChartData2(data2)
      setChartOptions2(options2);

    }

    catch (error) {
      pushLog("verbose","fetchGraphData",sessionStorage.getItem('name'),"Error getting the Graph Data")
      console.log("error", error);
    }
  }

  //pie chart for regions
  const fetchChartData = async (version) => {


    try {

      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/chartsData?version=${version}&userName=${sessionStorage.getItem('name')}`)
      let key = [];
      let value = [];

      response.data.map(({ totalValue, REGION }) => {
        key.push(REGION)
        value.push(totalValue)
      })

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      const data3 = {
        labels: key,
        datasets: [
          {
            data: value,
            backgroundColor: [

              documentStyle.getPropertyValue('--blue-700'),
              documentStyle.getPropertyValue('--teal-200'),
              documentStyle.getPropertyValue('--cyan-500'),
              documentStyle.getPropertyValue('--orange-500'),
              documentStyle.getPropertyValue('--green-700'),
            ],
            hoverBackgroundColor: [

              documentStyle.getPropertyValue('--blue-900'),
              documentStyle.getPropertyValue('--teal-300'),
              documentStyle.getPropertyValue('--cyan-700'),
              documentStyle.getPropertyValue('--orange-700'),
              documentStyle.getPropertyValue('--green-900')


            ]
          }
        ]
      }
      const options3 = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true
            }
          }
        }
      };

      setChartData3(data3);
      setChartOptions3(options3);

    }
    catch (error) {
      pushLog("verbose","fetchChartData",sessionStorage.getItem('name'),"Error fetching chart data")
      console.log("error fetching chart data", error);
      throw error;
    }
  }



  //pie chart for customers
  const fetchCustomerPieData = async (version) => {


    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/pieChartCustomer?version=${version}&userName=${sessionStorage.getItem('name')}`)
      let key = [];
      let value = [];
      // console.log("chart data", response.data);

      response.data.map(({ totalValue, endCustomerName }) => {
        key.push(endCustomerName)
        value.push(totalValue)
      })


      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      const data1 = {
        labels: key,
        datasets: [
          {
            data: value,
            backgroundColor: [

              documentStyle.getPropertyValue('--blue-700'),
              documentStyle.getPropertyValue('--red-400'),
              documentStyle.getPropertyValue('--yellow-500'),
              'rgba(20, 97, 112)',
              
              documentStyle.getPropertyValue('--teal-500') ,

            ],

            hoverBackgroundColor: [

              documentStyle.getPropertyValue('--blue-900'),
              documentStyle.getPropertyValue('--red-500'),
              documentStyle.getPropertyValue('--yellow-600'),
              'rgba(20, 97, 150)',
              documentStyle.getPropertyValue('--teal-600') ,
            ]

          }
        ]
      }
      const options1 = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true
            }
          }
        }
      };

      setChartData1(data1);
      setChartOptions1(options1);
    }

    catch (error) {
      pushLog("verbose","fetchCustomerPieData",sessionStorage.getItem('name'),"Error Fetching pie chart data")
      console.log("error", error);
      throw error;
    }
  }

  const handleVersionChange = (e) => {

    setVersion(e.value);
    fetchData(e.value);
    fetchChartData(e.value.name);
    fetchGraphData(e.value.name);
    fetchCustomerPieData(e.value.name);

  }

  const toast = useRef(null);

  const [flag, setFlag] = useState(false);

  const accept = () => {
   
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Current version is Published', life: 3000 });
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    setFlag(false);
  }

  const handleInsertToPublish = async (dataTableAnnual, publishVersion) => {
    try {
      debugger;
      console.log("Insert to publish table",dataTableAnnual)
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/summary/publish-version`, { "dataTableAnnual": dataTableAnnual, "publishVersion": publishVersion })
    }
    catch (error) {
      pushLog("verbose","handleInsertToPublish",sessionStorage.getItem('name'),"Error in publish data API")
      console.log("error", error);
    }
  }

  const checkDuplicatePublish = async () => {
    try {
      return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/already-published?userName=${sessionStorage.getItem("userName")}&product=${selectedProduct.name}`)
    }
    catch (error) {
      pushLog("verbose","checkDuplicatePublish",sessionStorage.getItem('name'),"error checking duplicate published version")
      console.log("error while checking duplicate publish", error);
    }
  }

  const handlePublish = async () => {
    let countPublish = 0;

    countPublish = await checkDuplicatePublish(version.name);


    if (countPublish.data > 0) {
      setVisibleDuplicatePublish(true);
    }
    else {
      confirm1();
    }
  }

  const confirm1 = () => {
    confirmDialog({
      message: `Are you sure you want to Publish ${version.name}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: async () => {
        accept();

        await handleInsertToPublish(dataTableAnnual, version.name);
      },
      reject
    });
  };


  const versionOptionTemplate = (option) => {
    // console.log(option)
    return (
      <div className="flex align-items-center">
        <div>
          {option.name}
          <span>{option.isPublished > 0 ? <i className="pi pi-upload" style={{ fontSize: '1rem', margin: '0 0 0 15px', color: "green", fontWeight: "900" }}></i> : null}</span>
        </div>
      </div>
    );
  };



  const footerContent = (
    <div>
      <Button label="Ok" icon="pi pi-check" onClick={() => setVisibleDuplicatePublish(false)} autoFocus />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div class='grid'>


        <div class='col-12 pt-4 pl-5'>
          <Dropdown value={version} onChange={(e) => handleVersionChange(e)} options={versionList} optionLabel="name"
            placeholder="Choose a Version"
            itemTemplate={versionOptionTemplate}
            className="w-full md:w-13rem" />
        </div>


        <div className='col-12' style={{ height: '100vh', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', marginBottom: '36%', alignItems: 'center', justifyContent: 'center' }}>
          
          {version ? <div className='col-12'>
            <Card>
              <h3>Monthwise YoY Sale Trend</h3>
              <Chart type="line" data={chartData2} options={chartOptions2} width='100%' height='350px'/>
            </Card>

          </div> : null }

          <div className='col-12' style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              
              
              {version ? <div className='col-6'>
                <Card>
                  <h3>Region Wise Total Value Distribution</h3>
                  <Chart type="pie" data={chartData3} options={chartOptions3} width='70%' height='60%' />
                </Card>
              </div> : null }
              {version ? <div className='col-6'>
                <Card>
                  <h3>TOP 5 Customers Sales Distribution</h3>
                  <Chart type="pie" data={chartData1} options={chartOptions1} width='70%' height='60%' />
                </Card>
              </div> : null }
            </div>
          </div>
        </div>



        {version ? <div class="col-12">
          
          <div class="grid card">
            <div class='col-1' style={{ marginLeft: '10px' }}>
              <Button type="button" icon="pi pi-file-excel" severity="success" rounded data-pr-tooltip="XLS" onClick={version ? exportToExcel : null} />
            </div>
            <div class='col-1' style={{ marginLeft: '10px' }}>
              <Button type="button" icon="pi pi-upload" severity="success" rounded data-pr-tooltip="Publish" onClick={version ? () => handlePublish() : null} />
            </div>
          </div>

        </div> : null }

        {dataTableAnnual && version ?<div class='col-12 mt-16'>
          <h2 style={{color: "grey",marginLeft: "17px",marginBottom: "3px"}}>Sales Plan</h2>
            <Summary headerGroup={headerGroup} dataTableAnnual={dataTableAnnual} bodyGroup={simulationBodyGroup} selectedProduct={selectedProduct.name} currentUrl={window.location.href.split("/")} /> 
        </div> : null }


        <Dialog visible={visibleDuplicatePublish} modal footer={footerContent} style={{ width: '50rem' }} onHide={() => setVisibleDuplicatePublish(false)}>
          <p className="m-0">
            oopss..!!! {sessionStorage.getItem("name")} has already published a version.
          </p>
        </Dialog>

      </div>

    </>
  )
}


