import axios from "axios";
const API_URL = "http://3.131.82.99/api/v1";

export const getAllVendors = async () => {
	try {
		return await axios.get(`${API_URL}/get/vendor/all`);
	} 
	catch (err) {
		return -1;
	}
};

export const getFeaturedVendors = async () => {
	try {
		return await axios.get(`${API_URL}/vendor/featured/all`);
	} 
	catch (err) {
		return -1;
	}
};


export const deleteVendor = async (vendorId) => {
	try {
		return await axios.delete(`${API_URL}/vendor/${vendorId}`, {
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
			}
		});
	} 
	catch (err) {
		return err;
	}
};

export const updateVendor = async (vid, state, file) => {
	const formData = new FormData();
	formData.append("file", file);
    try {
        return await axios.put(`${API_URL}/vendor/${vid}`, formData, {
            params: {
				vendor_id: vid,
				vendor_name: state.name,
				email: state.email,
				phone: state.phone,
				street1: state.street1,
				street2: state.street2,
				description: state.description,
				city: state.city,
				state: state.state,
				zip_code: state.zipCode,
				website: state.website,
				requirements: state.requirements,
				is_active: state.isActive,
				feature_vendor: state.featureVendor,
				hours: state.hours,
				facebook: state.facebook,
				instagram: state.instagram,
				youtube: state.youtube,
				twitter: state.twitter,
				best_of_logan_picks: state.bestOfLoganPicks
            },
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
            },
        });
    } 
	catch (e) {
        return e;
    }
};


export const addVendor = async (state, file) => {
	const formData = new FormData();
	formData.append("file", file);
	try {
		return await axios.post(`${API_URL}/vendor`, formData, {
			params: {
				vendor_name: state.name,
				email: state.email,
				phone: state.phone,
				street1: state.street1,
				street2: state.street2,
				description: state.description,
				city: state.city,
				state: state.state,
				zip_code: state.zipCode,
				website: state.website,
				requirements: state.requirements,
				is_active: state.isActive,
				feature_vendor: state.featureVendor,
				hours: state.hours,
				facebook: state.facebook,
				instagram: state.instagram,
				youtube: state.youtube,
				twitter: state.twitter,
				best_of_logan_picks: state.bestOfLoganPicks
			},
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
			},
		});
	} 
	catch (e) {
		return e;
	}
}