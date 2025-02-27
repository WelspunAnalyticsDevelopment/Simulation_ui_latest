import axios from 'axios';
import { pushLog } from './pushLog';

if (process.env.REACT_APP_ENV === 'development') {

    // Production-specific configuration
} else {

    // Development-specific configuration
}



const apiHost = process.env.REACT_APP_API_HOST;
const otherSetting = process.env.REACT_APP_OTHER_SETTING;
// console.log(apiHost, otherSetting, "********")


const fetchDataApi = async (name,selectedLevel,selectedProduct) => {
    // console.log("fetchDataApi start",performance.now());
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary?selectedProduct=${selectedProduct}&selectedLevel=${selectedLevel}&name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        pushLog("verbose","fetchDataApi",sessionStorage.getItem('name'),"Home Page Fetch API")
        throw error; // Rethrow the error to handle it in the component if needed

    }
};


export { fetchDataApi }



