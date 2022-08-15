import React, { useEffect, useState } from 'react';
import * as cuponsAPI from '../../../API/coupons';
import CuponsTable from './CuponsTable';

const ActiveAndFutureCoupons = () => {
    const [cupons, setCupons] = useState([])

    useEffect(() => {
        cuponsAPI.getAllActiveAndFutureCoupons().then(res => {
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

export default ActiveAndFutureCoupons;