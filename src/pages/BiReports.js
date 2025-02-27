import React from 'react'


function BiReports() {
    return (
        <div className='grid' style={{paddingTop : '1.5rem'  , color: 'black' , fontFamily: 'sans-serif' , fontSize: '13px'}}>
            <h2 style={{paddingLeft : '1rem'}}>Your Power BI Reports</h2>
            <iframe title="SalesPlan Phase ll" width="100%" height="700" src=
            "https://app.powerbi.com/reportEmbed?reportId=5af73341-5a16-45f6-8b97-8c3dd52eca32&autoAuth=true&ctid=5b4308bc-4f16-4e8d-aab0-26cc3b6f4bec&filterPaneEnabled=False"
                frameborder="0" allowFullScreen="true"></iframe>
        </div>
    )
}

export default BiReports;