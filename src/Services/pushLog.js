import axios from "axios";


const pushLog = async (logType, functionName, user, msg) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/pushErrorLogs?logType=${logType}&functionName=${functionName}&userName=${user},&msg=${msg}`)
    }
    catch(error){
        console.log("In pushing error Log",error)
    }
}


export { pushLog }