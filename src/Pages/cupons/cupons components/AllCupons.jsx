import React, { useEffect, useState } from 'react';
// import * as appsAPI from '../../../API/apps';
import * as cuponsAPI from '../../../API/coupons';
import CuponsTable from './CuponsTable';

const AllCupons = React.memo((props) => {
    const {coupons} = props;
    let activeCoupons = coupons.filter(item => item.is_active === true);

    return (
        <React.Fragment>
            <div>
                <CuponsTable data={activeCoupons}/>
            </div>
        </React.Fragment>
    )
})

export default AllCupons;