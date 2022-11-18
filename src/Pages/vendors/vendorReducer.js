export const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    description: '',
    hours: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    requirements: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    isActive: false,
    featureVendor: false,
    bestOfLoganPicks: '',
}

export const ACTION_TYPE = {
    LOAD_DATA: "LOAD_DATA",
    CHANGE_INPUT: "CHANGE_INPUT",
}

export const vendorReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ACTION_TYPE.CHANGE_INPUT: 
            return {
                ...state,
                [action.payload.name]:action.payload.value
            }
        
        case ACTION_TYPE.LOAD_DATA:
            let facebook, instagram, twitter, youtube, bestOfLoganPicks;

            (action.payload.data.facebook !== null) 
                ? facebook = action.payload.data.facebook : facebook = '';

            (action.payload.data.twitter !== null) 
                ? twitter = action.payload.data.twitter : twitter = '';

            (action.payload.data.instagram !== null) 
                ? instagram = action.payload.data.instagram : instagram = '';

            (action.payload.data.youtube !== null) 
                ? youtube = action.payload.data.youtube : youtube = '';
                
            (action.payload.data.best_of_logan_picks !== null) 
                ? bestOfLoganPicks = action.payload.data.best_of_logan_picks 
                : bestOfLoganPicks = '';

            return {
                name: action.payload.data.vendor_name,
                email: action.payload.data.email,
                phone: action.payload.data.phone,
                description: action.payload.data.description,
                hours: action.payload.data.hours,
                street1: action.payload.data.street1,
                street2: action.payload.data.street2,
                city: action.payload.data.city,
                state: action.payload.data.state,
                zipCode: action.payload.data.zip_code,
                website: action.payload.data.website,
                requirements: action.payload.data.requirements,
                isActive: action.payload.data.is_active,
                featureVendor: action.payload.data.feature_vendor,
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                youtube: youtube,
                bestOfLoganPicks: bestOfLoganPicks,
            }

        default:
            return state;
    }
}
