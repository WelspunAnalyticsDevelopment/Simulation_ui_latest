import axios from 'axios'
import { pushLog } from './pushLog'

export const GetHeadLevel = async (name,selectedLevel,selectedProduct) => {
    
    try{
        
        debugger;
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/getHeadLevelPublishedData?selectedProduct=${selectedProduct}&selectedLevel=${selectedLevel}&name=${name}`)
        console.log("response from the api call-----------",response.data)
        return response.data;
        
    }
    catch(error){
        console.log("error fetching Lead level Data",error)
        pushLog("verbose","fetchDataApi",sessionStorage.getItem('name'),"Home Page Fetch API")
        throw error
    }
    
}


