import { getRealStateDataAPI } from './realstate-api-service.js'


export function getRealStateData(filter) {
    console.log(filter)
   return getRealStateDataAPI()
        .then(realStateData => filterData(filter, realStateData))
    
}

function filterData(filter, realStateData) {

    if(filter.Bedrooms > 0) {
        realStateData = realStateData.find((data) => data.Bedrooms == filter.Bedrooms)
    }

    return realStateData
}   