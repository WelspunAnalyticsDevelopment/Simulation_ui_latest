import { WrapperSKU } from '@azure/msal-browser'
import { Card } from 'primereact/card'
import React from 'react'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react'
import { Button } from 'primereact/button';

export const ContactUs = () => {

    const [value, setValue] = useState('');

    return (
        <div style={{ color: 'black', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
            <Card style={{ display: 'flex', flexWrap: 'wrap', width: '50%', minHeight: '80%', marginLeft: '12rem' }}>

                <h1 style={{ textAlign: 'center' }}>Fill Out the Below Form</h1>
                <div className="card flex flex-column md:flex-row gap-3">

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" />
                    </div>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">Email</span>
                        <InputNumber placeholder="Price" />
                        <span className="p-inputgroup-addon">.00</span>
                    </div>

                </div>

                <div className="card flex flex-column md:flex-row gap-3 mt-4">
                    <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={64} placeholder='Address the Issue...' />
                </div>

                <Button severity='primary' className='mt-5'>Submit</Button>
            </Card>
        </div>
    )
}
