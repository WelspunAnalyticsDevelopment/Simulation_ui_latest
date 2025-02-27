import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { useMsal } from "@azure/msal-react";
import { fetchDataApi } from "../../Services/Services";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Sidebar } from 'primereact/sidebar';
        

function Header(props) {
    // const [selectedProduct, setSelectedProduct] = useState(null);

    const products = [
        { name: 'Terry Towel', code: 'TT' },
        { name: 'Rugs', code: 'RG' },
        { name: 'Bathrobe', code: 'BR' },
        { name: 'Sheets', code: 'SS' },
        { name: 'Top of Bed', code: 'TOB' },
        { name: 'Carpet' , code: 'CP'}
    ];
    const toggleDrawer = (event) => {
        props.parentCallback(!props.visible);
        event.preventDefault();
    };

    const { instance, accounts, inProgress } = useMsal();


    // const [levelSimulation , setLevelSimulation] = useState(null);
    const levels = [
        { name: 'Customer Level', code: 'NY' },
        { name: 'Program Level', code: 'RM' },
        { name: 'Plant Level', code: 'LDN' },
        { name: 'Region Level', code: 'IST' },
    ];


    
    const currentUrl = window.location.href.split('/')
    return (
        <div className="grid pt-1 pb-1" style={{ color: 'var(--primary-color-text) ', width: '102.1%' }}>
            <div className="md:col-3 pl-5">
                <Button icon={props.visible === true ? "pi pi-times" : "pi pi-bars"} onClick={(e) => toggleDrawer(e)} />

            </div>
            <div className="md:col-2">
                <Dropdown value={props.levelSimulation} onChange={(e) => props.setLevelSimulation(e.value)} options={levels} optionLabel="name"
                    placeholder="Select Level" className="w-full md:w-10rem" /> 
            </div>



            <div className="md:col-3">
                <Dropdown value={props.selectedProduct}
                    onChange={(e) => (
                        props.levelSimulation ? props.setSelectedProduct(e.value) : isDisabled)}
                    options={products} optionLabel="name"
                    placeholder="Select Product" className="w-full md:w-10rem" /> 
            </div>

            <div className="md:col-1 ml-8">
               <Button severity="danger" label="Logout" icon="pi pi-user" onClick={() => {
                    sessionStorage.setItem("userName", null);
                    instance.logoutRedirect()
                }} />
            </div>

            <div className="md:col-2 ml-2" style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white' }}>{sessionStorage.getItem("name")}</span>
            </div> 
        </div>
    )
}

export default Header;
