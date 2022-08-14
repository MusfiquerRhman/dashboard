import React, { useContext, useEffect } from 'react';
import * as cuponsAPI from '../../../API/coupons';
import { VendorContext } from '../../../Context APIs/vendorContext';
import CuponsTable from './CuponsTable';

const ExpiredCoupons = () => {
    // const { vendors, setVendors } = useContext(VendorContext)
    // const [cupons, setCupons] = useState([])
    const data = [
        {
          "coupon_id": 0,
          "vid": 0,
          "scid": 0,
          "sub_category_name": "string",
          "coupon_code": "string",
          "percentage_off": 0,
          "single_use": true,
          "feature_coupon": true,
          "start_date": "2022-08-14",
          "end_date": "2022-08-14",
          "created_date": "2022-08-14T09:42:24.245Z",
          "updated_date": "2022-08-14T09:42:24.245Z",
          "is_active": true
        }
      ]

    // useEffect(() => {
    //     const res = cuponsAPI.getAllCoupons();
    //     if(res.status === 200){
    //         console.log(res);
    //     }
    // }, [setVendors]);

    return (
        <React.Fragment>
            <div>
                <CuponsTable data={data}/>
            </div>
        </React.Fragment>
    )
}

export default ExpiredCoupons;