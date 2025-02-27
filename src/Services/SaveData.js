import axios from 'axios';
import { pushLog } from './pushLog';

const fetchSavedDataApi = async (version) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/savedSimulatedData?version=${version}&name=${sessionStorage.getItem('name')}`);
        // console.log("fetchSavedDataApi end",performance.now())
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        pushLog("verbose","fetchSavedDataAPI",sessionStorage.getItem('name'),"Fetching Saved Data API")
        throw error; // Rethrow the error to handle it in the component if needed
    }
};


export { fetchSavedDataApi }