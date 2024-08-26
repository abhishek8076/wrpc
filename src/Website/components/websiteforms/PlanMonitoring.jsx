import React, { useEffect, useState } from 'react'
import { TopHeader } from '../TopHeader/TopHeader'
import CmsDisplay from '../Header/CmsDisplay'
import { CmsFooter } from '../Footer/CmsFooter'
import { CSmartTable } from '@coreui/react-pro'

const PlanMonitoring = () => {

    const [data, setData]=useState([]);

    const columns=[
        {key:'s_no', label:"S.No."},
        {key:"state", label:"State Team"},
        {key:"audit", label:"State to be audited"},
        {key:"substation", label:"Name of Substation"},
        {key:"month", label:"Month of Audit"},
        {key:"status",label:"Status"},
    ];

    const items=[{
        state:"Chhattisgarh",
        audit:"Maharashtra",
        substation:"400kV Chandrapur",
        month:"December",
        status:"Protection Audit Completed on 17.01.2024 - 18.01.2024.",
    },
    {
        state:"Gujarat",
        audit:"Maharashtra",
        substation:"400kV Alkud",
        month:"December",
        status:"Protection Audit Completed on 18.12.2023 - 21.12.2023",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    {
        state:"",
        audit:"",
        substation:"",
        month:"",
        status:"",
    },
    
]

    useEffect(()=>{
        setData(items.map((item,index)=>({...item, s_no:index+1})));
    });
    

  return (
    <>
    <div>
        <div>
            <TopHeader/>
        </div>
        <CmsDisplay/>
        <main>
            <div className="container mt-4 vh-100">
                <h4>Plan Monitoring</h4>
                <CSmartTable columnSorter columns={columns} items={data} />
            </div>
            <CmsFooter/>
        </main>
    </div>
    </>
  )
}

export default PlanMonitoring


