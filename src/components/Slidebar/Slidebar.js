import React, { Children, Component, useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';

function Slidebar({ visible }) {
    const btnRef1 = useRef(false);
    const btnRef2 = useRef(false);
    const btnRef3 = useRef(false);

    const operationDropMenuItem = [{
        name: "Simulation",
        path: "/Dashboard",
        icon: "pi pi-home mr-2"
    }, {
        name: "Summary",
        path: "/Summary",
        icon: "pi pi-chart-line mr-2"
    }, {
        name: "Published",
        path: "/published",
        icon: "pi pi-cloud-upload mr-2"
    }
    ]

    const businessDropMenuItem = [{
        name: "Simulation",
        path: "/leadSimulation",
        icon: "pi pi-home mr-2"
    }, {
        name: "Summary",
        path: "/Summary",
        icon: "pi pi-chart-line mr-2"
    }, {
        name: "Published",
        path: "/published",
        icon: "pi pi-cloud-upload mr-2"
    }
    ]


    const orgDropMenuItem = [{
        name: "Simulation",
        path: "/salesHead",
        icon: "pi pi-home mr-2"
    }, {
        name: "Summary",
        path: "/Summary",
        icon: "pi pi-chart-line mr-2"
    }, {
        name: "Published",
        path: "/published",
        icon: "pi pi-cloud-upload mr-2"
    }
    ]

    const otherMenuItem = [
        {
            name: "Fiscal",
            path: "/fiscalCompare",
            icon: "pi pi-dollar mr-2"
        },
        {
            name: "Reports",
            path: "/biReports",
            icon: "pi pi-user mr-2"
        },
        {
            name: "Contact Us",
            path: "/contactUs",
            icon: "pi pi-phone mr-2"
        }
    ]



    return (
        <div className="grid">
            <div className="col-12" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--primary-color-text)',

            }}>

                <NavLink to='/'>{visible ? <img src="./welsell_DSLOGO.jpg" width="160px" height="45px" style={{ marginLeft: '14%', paddingTop: '4px', paddingBottom: '2px', transition: '0.25s ease' }} /> : <img src='./welspunWLogo.png' width="50px" height="45px" style={{ marginLeft: '24%', paddingTop: '4px', paddingBottom: '2px', transition: '0.1s ease' }} />}</NavLink>
            </div>



            <div className="overflow-y-auto">

                <ul className="list-none p-5 m-0">

                    <li>
                        <StyleClass nodeRef={btnRef3} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                            <a ref={btnRef3} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full active:surface-100">
                                <i className="pi pi-chart-line mr-4" style={{ fontSize: '23px' }}></i>
                                <span className="font-medium">Organisation</span>
                                <i className="pi pi-chevron-down ml-2 mr-1"></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                        <ul className="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                            {orgDropMenuItem.map((item, index) =>
                                <li key={index}>
                                    <NavLink className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full" to={item.path} style={{ textDecoration: "none", }}>

                                        <i className={item.icon}></i>

                                        <span className="font-medium">{item.name}</span>

                                        <Ripple />
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>

                    <li>
                        <StyleClass nodeRef={btnRef2} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                            <a ref={btnRef2} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                <i className="pi pi-spin pi-cog mr-4" style={{ fontSize: '23px' }}></i>
                                <span className="font-medium">Business</span>
                                <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                        <ul className="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                            {businessDropMenuItem.map((item, index) =>
                                <li key={index}>
                                    <NavLink className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                        to={item.path}
                                        style={{ textDecoration: "none", }}
                                        activeStyle={{ backgroundColor: "blue" }}>

                                        <i className={item.icon}></i>

                                        <span className="font-medium">{item.name}</span>

                                        <Ripple />
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </li>

                    <li>
                        <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                            <a ref={btnRef1} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                <i className="pi pi-users mr-4" style={{ fontSize: '23px' }}></i>
                                <span className="font-medium">Operational</span>
                                <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                <Ripple />
                            </a>
                        </StyleClass>
                        <ul className="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                            {operationDropMenuItem.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        exact
                                        to={item.path}
                                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                                        style={{ textDecoration: "none" }}
                                        activeStyle={{ backgroundColor: "blue" }}
                                    >
                                        <i className={item.icon}></i>
                                        <span className="font-medium">{item.name}</span>
                                        <Ripple />
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>

                </ul>

                <ul className="list-none pl-3 m-0 pr-6">
                    {otherMenuItem.map((item, index) =>
                        <li key={index}>
                            <NavLink className="p-ripple flex align-items-center cursor-pointer p-3 ml-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full" to={item.path} style={{ textDecoration: "none", }}>

                                <i style={{ fontSize: '23px' }} className={item.icon}></i>

                                <span className="font-medium ml-3">{item.name}</span>

                                <Ripple />

                            </NavLink>
                        </li>
                    )}
                </ul>

            </div>
        </div>
    );
};

export default Slidebar