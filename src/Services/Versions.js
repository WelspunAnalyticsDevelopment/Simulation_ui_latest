import axios from "axios";


const fetchVersionApi =  async () => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/version`);
        return response.data;
    }
    catch (error){
        console.log('Error fetching data:',error);
        throw error;
    }
}

export {fetchVersionApi}