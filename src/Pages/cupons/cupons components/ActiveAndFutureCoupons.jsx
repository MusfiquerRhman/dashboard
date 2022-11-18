import React, { useEffect, useState } from 'react';
import * as cuponsAPI from '../../../API/coupons';
import CuponsTable from './CuponsTable';

const ActiveAndFutureCoupons = () => {
    const [coupons, setCoupons] = useState([])

    useEffect(() => {
        cuponsAPI.getAllActiveAndFutureCoupons().then(res => {
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
}

export default ActiveAndFutureCoupons;