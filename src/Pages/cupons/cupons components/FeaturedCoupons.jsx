import React, { useEffect, useState } from 'react';
import * as couponsAPI from '../../../API/coupons';
import CuponsTable from './CuponsTable';

const FeaturedCoupons = React.memo(() => {
    const [coupons, setCoupons] = useState([])

    useEffect(() => {
        couponsAPI.getAllFeaturedCoupons().then(res => {
            if(res.status === 200){
                setCoupons(res.data);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <div>
                <CuponsTable data={coupons}/>
            </div>
        </React.Fragment>
    )
})

export default FeaturedCoupons;