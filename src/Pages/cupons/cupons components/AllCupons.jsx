import React, { useEffect, useState } from 'react';
// import * as appsAPI from '../../../API/apps';
import * as cuponsAPI from '../../../API/coupons';
import CuponsTable from './CuponsTable';

const AllCupons = (props) => {
    const {coupons} = props;

    return (
        <React.Fragment>
            <div>
                <CuponsTable data={coupons}/>
            </div>
        </React.Fragment>
    )
}

export default AllCupons;