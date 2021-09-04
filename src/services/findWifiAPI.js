import axios from 'axios';

export const findWifiLocations = async(start = 1, end = 1000) => {
    const url = `http://openapi.seoul.go.kr:8088/5267685948736b643839736d425455/json/TbPublicWifiInfo_GN/${start}/${end}/`;
    const response = await axios.get(url);
    const locations = response.data.TbPublicWifiInfo_GN.row;
    const totalCount = response.data.TbPublicWifiInfo_GN.list_total_count;
    if (totalCount > end) {
        const newStart = end + 1;
        const newEnd = Math.min(end + 1000, totalCount);
        return (await findWifiLocations(newStart, newEnd)).concat(locations);
    } else {
        return locations;
    }
};