import React, { useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import axios from 'axios';
import { Column } from 'primereact/column';
import { Row } from 'primereact/row';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Summary } from '../components/Summary/Summary';


export const FiscalCompare = () => {

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loadingDT, setLoadingDT] = useState(false);


    const fiscalYearOptions = [
        { name: `${new Date(Date.now()).getFullYear() + "-" + parseInt(new Date(Date.now()).getFullYear() + 1)}`, code: 'RM' },
        { name: `${new Date(Date.now()).getFullYear() - 1 + "-" + parseInt(new Date(Date.now()).getFullYear())}`, code: 'LDN' },
    ];

    const items = ["Saleable Unit", "KGS", "SQMT", "MTR", "Rate", "Value", "USDN"]

    const productsOptions = [
        { name: "Terry Towel", code: "TT" },
        { name: "Rugs", code: "TT" },
        { name: "Bathrobe", code: "TT" },
        { name: "Sheets", code: "TT" },
        { name: "Top of Bed", code: "TT" },
        { name: "Carpet", code: "TT" },
    ]

    const [fiscalData, setFiscalData] = useState()

    const handleFiscalYearChange = async (fiscalyear, product) => {
        setFiscalData([])
        debugger;
        setLoadingDT(true)

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/getFiscalData?fiscalYear=${fiscalyear.name}&product=${product.name}`)

            
            setFiscalData((newarray) => {
                newarray = [...response.data.recordsets[0]]
                return newarray;
            });

            console.log("this is the fiscal data", fiscalData);
            setLoadingDT(false)
        }
        catch (error) {
            console.log("error in api call for fiscal data", error);
            setLoadingDT(false);

        }
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


    const headerPublishGroup = (
        <ColumnGroup >
            <Row>
                <Column field='END_CUSTOMER_NAME' header={"Customer Name"} sortable scrollable frozen filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} rowSpan={2} />
                <Column field='productCat' header={"Product"} scrollable frozen style={{ minWidth: '3rem' }} rowSpan={2} />
                {months.map((month) => (
                    <Column key={month} header={month} colSpan={7} />
                ))}
            </Row>
            <Row>
                {months.map((month) => (
                    items.map((item) => (
                        <Column key={month + item} header={item} />
                    ))))}
            </Row>
        </ColumnGroup>
    )


    useEffect(() => {
        debugger;
        if (selectedProduct && selectedYear) {
            handleFiscalYearChange(selectedYear, selectedProduct)
        }

    }, [selectedProduct, selectedYear])

    return (
        <div style={{ color: 'black', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px' }}>
                <Dropdown style={{ marginRight: "10px" }} value={selectedYear} onChange={async (e) => setSelectedYear(e.value)} options={fiscalYearOptions} optionLabel="name"
                    placeholder="Select Fiscal year" className="w-full md:w-14rem" />
                <Dropdown value={selectedProduct} onChange={async (e) => setSelectedProduct(e.value)} options={productsOptions} optionLabel="name"
                    placeholder="Select Product" className="w-full md:w-14rem" />
            </h3>

            <h2>Sales Data For Each Fiscal Year</h2>

            <DataTable value={fiscalData} showGridlines stripedRows scrollHeight='430px' scrollable frozen headerColumnGroup={headerPublishGroup} tableStyle={{ minWidth: '50rem' }} style={{ marginBottom: "10vh" }} loading={loadingDT} emptyMessage="NO Data" >
                <Column frozen field='END_CUSTOMER_NAME' style={{ minWidth: '200px' }}></Column>
                <Column frozen field='PRODUCT_CAT' style={{ minWidth: '150px' }}></Column>
                <Column field='APR_(SALEABLE_UNITS)'></Column>

                <Column field='APRIL_KGS'></Column>
                <Column field='APRIL_(SQ_MTR)'></Column>
                <Column field='APR_MTR'></Column>

                <Column field='APR_RATE_AS_PER_CURRENCY'></Column>
                <Column field='APRIL_VALUE'></Column>
                <Column field='APRIL_USDN'></Column>
                <Column field='MAY_(SALEABLE_UNITS)'></Column>

                <Column field='MAY_KGS'></Column>
                <Column field='MAY_(SQ_MTS)'></Column>
                <Column field='MAY_MTR'></Column>

                <Column field='MAY_RATE_AS_PER_CURRENCY'></Column>
                <Column field='MAY_VALUE'></Column>
                <Column field='MAY_USDN'></Column>
                <Column field='JUN_(SALEABLE_UNITS)'></Column>

                <Column field='JUNE_KGS'></Column>
                <Column field='JUNE_(SQ_MTS)'></Column>
                <Column field='JUNE_MTR'></Column>

                <Column field='JUN_RATE_AS_PER_CURRENCY'></Column>
                <Column field='JUNE_VALUE'></Column>
                <Column field='JUNE_USDN'></Column>
                <Column field='JULY_(SALEABLE_UNITS)'></Column>

                <Column field='JULY_KGS'></Column>
                <Column field='JULY_(SQ_MTS)'></Column>
                <Column field='JUL_MTR'></Column>

                <Column field='JUL_RATE_AS_PER_CURRENCY'></Column>
                <Column field='JULY_VALUE'></Column>
                <Column field='JULY_USDN'></Column>
                <Column field='AUGUST_(SALEABLE_UNITS)'></Column>

                <Column field='AUG_KGS'></Column>
                <Column field='AUGUST_(SQ_MTS)'></Column>
                <Column field='AUG_MTR'></Column>

                <Column field='AUG_RATE_AS_PER_CURRENCY'></Column>
                <Column field='AUG_VALUE'></Column>
                <Column field='AUG_USDN'></Column>
                <Column field='SEP_(SALEABLE_UNITS)'></Column>

                <Column field='SEP_KGS'></Column>
                <Column field='APRIL_(SQ MTR)'></Column>
                <Column field='AUG_MTR'></Column>

                <Column field='SEP_RATE_AS_PER_CURRENCY'></Column>
                <Column field='SEPT_VALUE'></Column>
                <Column field='SEPT_USDN'></Column>
                <Column field='OCT_(SALEABLE_UNIT)'></Column>

                <Column field='OCT_KGS'></Column>
                <Column field='OCT_SQ_MTS'></Column>
                <Column field='OCT_MTR'></Column>

                <Column field='OCT_RATE_AS_PER_CURRENCY'></Column>
                <Column field='OCT_(VALUE)'></Column>
                <Column field='OCTOBER_(USDN)'></Column>
                <Column field='NOVEMBER_(SALEABLE_UNITS)'></Column>

                <Column field='NOV_KGS'></Column>
                <Column field='NOVEMBER_(SQ_MTS)'></Column>
                <Column field='NOV_MTR'></Column>

                <Column field='NOV_RATE_AS_PER_CURRENCY'></Column>
                <Column field='NOV_VALUE'></Column>
                <Column field='NOV_USDN'></Column>
                <Column field='DECEMBER_(SALEABLE_UNITS)'></Column>

                <Column field='DEC_KGS'></Column>
                <Column field='DECEMBER_(SQ_MTS)'></Column>
                <Column field='DEC_MTR'></Column>

                <Column field='DEC_RATE_AS_PER_CURRENCY'></Column>
                <Column field='DEC_VALUE'></Column>
                <Column field='DEC_USDN'></Column>
                <Column field='JANUARY_(SALEABLE_UNITS)'></Column>

                <Column field='JAN_KGS'></Column>
                <Column field='JANUARY_(SQ_MTS)'></Column>
                <Column field='JAN_MTR'></Column>

                <Column field='JAN_RATE_AS_PER_CURRENCY'></Column>
                <Column field='JAN_VALUE'></Column>
                <Column field='JAN_USDN'></Column>
                <Column field='FEBRUARY_(SALEABLE_UNITS)'></Column>

                <Column field='FEB_KGS'></Column>
                <Column field='FEBRUARY(SQ MTS)'></Column>
                <Column field='FEB_MTR'></Column>

                <Column field='FEB_RATE_AS_PER_CURRENCY'></Column>
                <Column field='FEB_VALUE'></Column>
                <Column field='FEB_USDN'></Column>
                <Column field='MARCH_(SALEABLE_UNITS)'></Column>

                <Column field='MAR_KGS'></Column>
                <Column field='MARCH(SQ_MTS)'></Column>
                <Column field='MAR_MTR'></Column>

                <Column field='MAR_RATE_AS_PER_CURRENCY'></Column>
                <Column field='MAR_VALUE'></Column>
                <Column field='MAR_USDN'></Column>
                

            </DataTable>

        </div>
    )
}
