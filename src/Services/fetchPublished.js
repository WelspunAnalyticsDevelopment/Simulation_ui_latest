import axios from 'axios'
import { pushLog } from './pushLog';

const fetchPublishedData = async (setLoadingDT , setPublishData, publishData , setExcelEnable , productList , setVersionState) => {
    setLoadingDT(true);
    try{  
      console.log("product list",productList);
      debugger;
      setExcelEnable(false);
      
      await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/summary/getPublishedData?productList=${productList}&teamLeader=${sessionStorage.getItem("userName")}`).then((res)=> {
        
        setPublishData(res.data.recordsets[0])

        publishData.map((item) => { 
          setVersionState(prevData => {
            let arrayItem = prevData.findIndex(e =>e == item.versionNo)

            if(arrayItem == -1){
              prevData = [...prevData,item.versionNo]
            }
            return prevData;
          })
        })
        

      }).catch((error) => {
        console.log("error fetching the data",error);
        setLoadingDT(false)
      })
      
      // await setPublishData(response.data.recordsets[0])
      
      // if(response.data.recordsets[0].length > 0){
      //   setExcelEnable(true);
      // }

      // publishData.map( async(item) => { 
      //   setVersionState(prevData => {
      //     let arrayItem = prevData.findIndex(e =>e == item.versionNo)
      //     let newItems = [...prevData];
      //     if(arrayItem == -1) {
      //       newItems.push(item.versionNo)
      //     }
      //     return newItems;
      //   })
      // })

    setLoadingDT(false);
    }
    catch(error){ 
      pushLog("verbose","fetchPublishedData",sessionStorage.getItem('name'),"Error fetching published data")
      console.log("error in fetching published data",error);
      setLoadingDT(false);
      throw error;
    }
  }

export {fetchPublishedData};