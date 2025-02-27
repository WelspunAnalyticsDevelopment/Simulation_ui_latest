import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { pushLog } from '../Services/pushLog';

export const SavePopUp = ({ showDialog, handleCloseDialog , dataTableAnnual }) => {

  var userName = sessionStorage.getItem("userName");

  const handleDuplicateVersion = async (numberValue) => {
    try {
      debugger;
      console.log(userName);
      return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/checkDuplicateVersion?textValue=${userName}&numberValue=${numberValue}&userName=${sessionStorage.getItem('name')}`)
    }
    catch (error) {
      pushLog("verbose","handleDuplicateVersion",sessionStorage.getItem('name'),"error checking duplicate version")
      console.log('error', error)
    }
  }




  const [showVersionPopup, setShowVersionPopup] = useState(false)

  const handleSaveSimulation = async () => {
    
    console.log(document.getElementById('inputVersionNumber').getElementsByTagName('input')[0].getAttribute('aria-valuenow'))

    let numberValue = document.getElementById('inputVersionNumber').getElementsByTagName('input')[0].getAttribute('aria-valuenow');

    await handleDuplicateVersion(numberValue).then((res) => {

      if (res.data > 0) {

        setShowVersionPopup(true);

        handleCloseDialog(true)
      }
      else {
        try {
          console.log("this is the datatableannual", dataTableAnnual)
          // Make an HTTP POST request to save data
          axios.post(`${process.env.REACT_APP_API_ENDPOINT}/summary/save-data`, { "dataTableAnnual": dataTableAnnual, "textValue": userName, "numberValue": numberValue });
          // console.log('Data saved successfully');
          handleCloseDialog(true)

        } catch (error) {
          pushLog("verbose","handleSaveSimulation",sessionStorage.getItem('name'),"Data Saving API")
          console.error('Error saving data:', error);
        }
      }
    })

  }

  const footer = (
    <div>
      <Button label="OK" icon="pi pi-check" onClick={() => setShowVersionPopup(false)} />
    </div>
  );


  return (
    <div>

      {/* Save pop up */}
      <Dialog
        header="Want to Save your Simulation ?"
        visible={showDialog}
        style={{ width: '50vw' }}
        onHide={handleCloseDialog}
        footer={
          <div>
            <Button label="Cancel" icon="pi pi-times" onClick={handleCloseDialog} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={handleSaveSimulation} autoFocus/>
          </div>
        }
      >

        <div className="p-fluid">
          <div className="p-inputgroup">

            {/* getting user name from the session storage */}

            <span className="p-inputgroup-addon" style={{ margin: '0' }}>{userName}</span>
            <span className="p-inputgroup-addon" style={{ margin: '0' }}>_version_</span>

            <InputNumber
              value={0}
              id='inputVersionNumber'
              placeholder="Enter number"
              className="p-inputgroup-addon"
              style={{ width: '30%' }}
            />
          </div>
        </div>


      </Dialog>


      <Dialog header="Duplicate Version" visible={showVersionPopup} style={{ width: '50vw' }} footer={footer} onHide={() => setShowVersionPopup(false)}>
        <div>
          <p style={{ textAlign: "center" }}>A duplicate version was found.</p>
          <p style={{ textAlign: "center" }}>Please save a different Version</p>
        </div>
      </Dialog>

    </div>
  )
}
