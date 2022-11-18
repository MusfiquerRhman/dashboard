import React, { useEffect, useState } from 'react';
// import * as appsAPI from '../../../API/apps';
import * as couponsAPI from '../../../API/coupons';
import CuponsTable from './CuponsTable';

const ExpiredCoupons = () => {
    const [cupons, setCupons] = useState([])

    useEffect(() => {
        couponsAPI.getAllExpiredCoupons().then(res => {
            if(res.status === 200){
                setCupons(res.data);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <div>
                <CuponsTable data={cupons}/>
            </div>
        </React.Fragment>
    )
}

export default ExpiredCoupons;