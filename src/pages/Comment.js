import axios from 'axios';
import React, { useEffect, useRef, useState, version } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { Button } from 'primereact/button';
import { fetchPublishedData } from '../Services/fetchPublished';
import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { pushLog } from '../Services/pushLog';
import { MultiSelect } from 'primereact/multiselect';


function Comment({ selectedProduct }) {
  const toast = useRef(null);

  const [publishData, setPublishData] = useState([]);
  const [excelEnable, setExcelEnable] = useState(false);
  // const [publishedVersion, setPublishedVersion] = useState('');
  const [loadingDT, setLoadingDT] = useState(false);
  const [unitHeader, setUnitHeader] = useState('');
  const [flag, setFlag] = useState(false);

  const [selectedProductCats, setSelectedProductCats] = useState(null);

  const [versionSet,setVersionState] = useState([])

  const loginRequest = {
    scopes: ["User.Read"]
  };

  const { login, result, error } = useMsalAuthentication(InteractionType.Redirect, loginRequest);

  useEffect(() => {
  debugger;
    if (selectedProduct) {
      if (error) {
        login(InteractionType.Redirect, loginRequest);
      }

      

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


  }, [selectedProduct]);

  if (result !== null) {
    sessionStorage.setItem("userName", result.account.username /*'Avinash_Malani@welspun.com' */)
    sessionStorage.setItem("name", result.account.name /*'AVINASH MALANI' */);

  }

  const items = ["Saleable Unit", "KGS","SQMT","MTR", "Rate", "Value", "USDN"]
  const months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];


  const headerPublishGroup = (
    <ColumnGroup >
      <Row>
        <Column header={"Customer Name"} sortable scrollable frozen filter filterPlaceholder="Search by name" field="END CUSTOMER NAME" style={{ minWidth: '12rem' }} rowSpan={2} />
        <Column header={"Product"} scrollable frozen field='PRODUCT CAT' style={{minWidth: '3rem'}} rowSpan={2}/>
        {months.map((month) => (
          <Column key={month} header={month} colSpan={7} />
        ))}
        <Column header='Total SU' style={{ minWidth: '8rem' }} rowSpan={2} />
        <Column header='Total Value' style={{ minWidth: '8rem' }} rowSpan={2} />
        <Column header='Total USDN' style={{ minWidth: '8rem' }} rowSpan={2} />
        <Column header={'Total KGS'} style={{ minWidth: '8rem' }} rowSpan={2}/>
        <Column header={'Total SQMT'} style={{ minWidth: '8rem' }} rowSpan={2}/>
        <Column header={'Total MTR'} style={{ minWidth: '8rem' }} rowSpan={2}/>
      </Row>
      <Row>
        {months.map((month) => (
          items.map((item) => (
            <Column key={month + item} header={item} />
          ))))}
      </Row>
    </ColumnGroup>
  )



  function exportToExcel() {
    import('xlsx').then((xlsx) => {

      const worksheet = xlsx.utils.json_to_sheet(publishData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, sessionStorage.getItem("userName"));
    });
  }

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


  const accept = async () => {
    setFlag(true);
    // await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/summary/updateSalePlan?name=${sessionStorage.getItem('name')}`)
    try {
      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/summary/updateSalePlan?name=${sessionStorage.getItem('name')}&selectedProduct=${selectedProduct.name}`)
    }
    catch (error) {
      pushLog("verbose", "updateSalePlan", sessionStorage.getItem('name'), "Error in updating saleplan for next year")
      console.log("error", error)
    }
    await toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

  const confirm1 = () => {
    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept,
      reject
    });
  };


  const handleUpdateSaleplanNext = async () => {
    confirm1();
  }



  //multiselect dropdown

  const products = [
    { name: 'Terry Towel', code: 'NY' },
    { name: 'Rugs', code: 'RM' },
    { name: 'Bathrobe', code: 'LDN' },
    { name: 'Sheets', code: 'IST' },
    { name: 'Top of Bed', code: 'PRS' },
    { name: 'Carpet', code: 'CP' }
  ];


  const  handlefetchpublished = async () => {
    
    setVersionState([])

    let productList = []

    selectedProductCats.map((item)=> {
      productList = [...productList,item.name]; 
    })
    console.log("this is the product list",productList);
    
    await fetchPublishedData(setLoadingDT, setPublishData,publishData, setExcelEnable, productList, setVersionState)

    // publishData.map( async (item) => { 
    //     setVersionState(prevData => {
    //       let arrayItem = prevData.findIndex(e =>e == item.versionNo)
    //       let newItems = [...prevData];
    //       if(arrayItem== -1) {
    //         newItems.push(item.versionNo)
    //       }
    //       return newItems
    //     })
    // })
    
    console.log("versionList",versionSet)
    
  }


  return (


    <div className='col-12 card' style={{ color: 'black', maxHeight: '100vh' }}>

      <div className="col-12 mt-2">
        <MultiSelect value={selectedProductCats} onChange={(e) => setSelectedProductCats(e.value)} options={products} optionLabel="name" 
                placeholder="Select Products" maxSelectedLabels={3} className="w-full md:w-15rem" />
        <Button label='Submit' onClick={(e) => handlefetchpublished(selectedProductCats)}/>
      
      </div>

      {/* <div class='col-12 mb-3'>
        <h3 style={{ fontFamily: 'sans-serif', color: "green" }}> Published Version :- {versionSet.length > 0 ? versionSet : null}</h3>
      </div> */}

      <div class='col-1 mb-3'>
        <Button type="button" icon="pi pi-file-excel" severity="success" rounded data-pr-tooltip="XLS" onClick={publishData.length ? exportToExcel : null} />
      </div>

      <div className="card">
        <DataTable value={publishData} showGridlines stripedRows scrollHeight='430px' scrollable frozen headerColumnGroup={headerPublishGroup} tableStyle={{ minWidth: '50rem' }} style={{ marginBottom: "10vh" }} loading={loadingDT} emptyMessage="No published version" >
          <Column frozen field='END CUSTOMER NAME' style={{ minWidth: '200px' }}></Column>
          <Column frozen field='PRODUCT CAT' style={{minWidth : '150px'}}></Column>
          <Column field='APR (SALEABLE UNITS)'></Column>

          <Column field='APRIL KGS'></Column>
          <Column field='APRIL (SQ MTR)'></Column>
          <Column field='APR MTR'></Column>

          <Column field='APR RATE AS PER CURRENCY'></Column>
          <Column field='APRIL VALUE'></Column>
          <Column field='APRIL USDN'></Column>
          <Column field='MAY (SALEABLE UNITS)'></Column>

          <Column field='MAY KGS'></Column>
          <Column field='MAY (SQ MTS)'></Column> 
          <Column field='MAY MTR'></Column>
        
          <Column field='MAY RATE AS PER CURRENCY'></Column>
          <Column field='MAY VALUE'></Column>
          <Column field='MAY USDN'></Column>
          <Column field='JUN (SALEABLE UNITS)'></Column>

          <Column field='JUNE KGS'></Column>
          <Column field='JUNE (SQ MTS)'></Column>
          <Column field='JUNE MTR'></Column>

          <Column field='JUN RATE AS PER CURRENCY'></Column>
          <Column field='JUNE VALUE'></Column>
          <Column field='JUNE USDN'></Column>
          <Column field='JULY (SALEABLE UNITS)'></Column>

          <Column field='JULY KGS'></Column>
          <Column field='JULY (SQ MTS)'></Column> 
          <Column field='JUL MTR'></Column>

          <Column field='JUL RATE AS PER CURRENCY'></Column>
          <Column field='JULY VALUE'></Column>
          <Column field='JULY USDN'></Column>
          <Column field='AUGUST (SALEABLE UNITS)'></Column>

          <Column field='AUG KGS'></Column> 
          <Column field='AUGUST (SQ MTS)'></Column>
          <Column field='AUG MTR'></Column>

          <Column field='AUG RATE AS PER CURRENCY'></Column>
          <Column field='AUG VALUE'></Column>
          <Column field='AUG USDN'></Column>
          <Column field='SEP (SALEABLE UNITS)'></Column>

          <Column field='SEP KGS'></Column>
          <Column field='APRIL (SQ MTR)'></Column>
          <Column field='AUG MTR'></Column>

          <Column field='SEP RATE AS PER CURRENCY'></Column>
          <Column field='SEPT VALUE'></Column>
          <Column field='SEPT USDN'></Column>
          <Column field='OCT (SALEABLE UNIT)'></Column>

          <Column field='OCT KGS'></Column>
          <Column field='OCT SQ MTS'></Column>
          <Column field='OCT MTR'></Column>

          <Column field='OCT RATE AS PER CURRENCY'></Column>
          <Column field='OCT (VALUE)'></Column>
          <Column field='OCTOBER (USDN)'></Column>
          <Column field='NOVEMBER (SALEABLE UNITS)'></Column>

          <Column field='NOV KGS'></Column>
          <Column field='NOVEMBER (SQ MTS)'></Column>
          <Column field='NOV MTR'></Column>

          <Column field='NOV RATE AS PER CURRENCY'></Column>
          <Column field='NOV VALUE'></Column>
          <Column field='NOV USDN'></Column>
          <Column field='DECEMBER (SALEABLE UNITS)'></Column>

          <Column field='DEC KGS'></Column>
          <Column field='DECEMBER (SQ MTS)'></Column>
          <Column field='DEC MTR'></Column>

          <Column field='DEC RATE AS PER CURRENCY'></Column>
          <Column field='DEC VALUE'></Column>
          <Column field='DEC USDN'></Column>
          <Column field='JANUARY (SALEABLE UNITS)'></Column>

          <Column field='JAN KGS'></Column>
          <Column field='JANUARY (SQ MTS)'></Column>
          <Column field='JAN MTR'></Column>

          <Column field='JAN RATE AS PER CURRENCY'></Column>
          <Column field='JAN VALUE'></Column>
          <Column field='JAN USDN'></Column>
          <Column field='FEBRUARY (SALEABLE UNITS)'></Column>

          <Column field='FEB KGS'></Column> 
          <Column field='FEBRUARY(SQ MTS)'></Column>
          <Column field='FEB MTR'></Column>

          <Column field='FEB RATE AS PER CURRENCY'></Column>
          <Column field='FEB VALUE'></Column>
          <Column field='FEB USDN'></Column>
          <Column field='MARCH (SALEABLE UNITS)'></Column>

          <Column field='MAR KGS'></Column>
          <Column field='MARCH(SQ MTS)'></Column>
          <Column field='MAR MTR'></Column>

          <Column field='MAR RATE AS PER CURRENCY'></Column>
          <Column field='MAR VALUE'></Column>
          <Column field='MAR USDN'></Column>
          <Column field='Total Saleable Unit'></Column>
          <Column field='Total Value'></Column>
          <Column field='Total USDN'></Column>

          <Column field='Total KGS'></Column> 
          <Column field='TOTAL SQR MTRS'></Column>
          <Column field='TOTAL SATEEN MTR'></Column>


        </DataTable>
      </div>

      <Toast ref={toast} />
      <ConfirmDialog />
      {/* TODO: need to add this in admin page */}
      {/* <div className='card'>
        <Button type='button' label='UPDATE SALEPLAN FOR NEXT YEAR' icon="pi pi-cloud-upload" severity='success' onClick={handleUpdateSaleplanNext} />
      </div> */}

    </div>
  );
}


export default Comment;

