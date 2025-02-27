import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export const Simulation = ({ dataTableAnnual, headerGroupqty, bodyGroup, CheckBodyGroup , populateBodyGroup , handleFormSubmit, handleReset, months, flag, setFlag, loading, levelSimulation , selectedProduct }) => {

  const toast = useRef(null);

  const accept = () => {

    handleFormSubmit();
    setFlag(1);
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  }

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }

  const areYouSure = () => {

    confirmDialog({
      message: 'Are you sure you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept,
      reject
    });
  };


  console.log("this is the simulation page",dataTableAnnual)
  return (
    <div className='grid'>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="col-12">
        <Card>
          <div className="grid">
            <div className='col-12'>
              <DataTable id="simulationTable" value={dataTableAnnual} showGridlines stripedRows
                headerColumnGroup={headerGroupqty} scrollHeight='550px' tableStyle={{ minWidth: '50rem' }} loading={dataTableAnnual ? loading : null}>
                <Column field="customerName" label= "uniqueIdentificationNo" frozen ></Column>
                
                {(levelSimulation== 'Customer Level' || levelSimulation== 'Program Level') ? <Column field="plant" frozen ></Column> : null}
                {(levelSimulation== 'Customer Level' || levelSimulation== 'Program Level') ? <Column field='productSubCat' frozen></Column> : null}
                {(levelSimulation== 'Customer Level' || levelSimulation== 'Program Level') ? <Column field='matcode' frozen></Column> : null}
                
                <Column field="Check" body={(e) => CheckBodyGroup(e)}></Column>
                <Column field="PopulateColumns" body={(e) => populateBodyGroup(e)}/>
                {months.map((item) => (
                  <Column style={{ width: '4rem' , zIndex: 1 }}  key={item} body={(e) => bodyGroup(e, item)} ></Column>
                ))}
              </DataTable>
              
            </div>
            <div className=" col-offset-10 col-1">
              <Button label="Apply" onClick={flag ? null : areYouSure} style={flag ? { backgroundColor: "var(--gray-500)" } : { backgroundColor: "var(--blue-500)" }} />
            </div>
            <div className="col-1">
              <Button label="Reset" severity="danger" onClick={handleReset} />
            </div>
          </div>
        </Card >
      </div>
    </div>
  )
}