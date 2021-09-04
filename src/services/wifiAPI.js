import axios from 'axios';

export const findWifiLocations = async(start = 1, end = 1000) => {
    const url = `http://openapi.seoul.go.kr:8088/704a73646a736b6436314f705a6350/json/SebcPublicWifiEng/1/1000/`;
    const response = await axios.get(url);
    const locations = response.data.SebcPublicWifiEng.row;
    const totalCount = response.data.SebcPublicWifiEng.list_total_count;

    if (totalCount > end) {
        const newStart = end + 1;
        const newEnd = Math.min(end + 1000, totalCount);
        return (await findWifiLocations(newStart, newEnd)).concat(locations);
    } else {
        return locations;
    }
};