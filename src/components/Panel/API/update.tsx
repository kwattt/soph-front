import axios from 'axios';

const updateApi = (endpoint: string, data : any) => {
  const updateData = async () => {
    await axios.post(endpoint, data).then(response => {
      return response.status
    }).catch(error => {
      console.log(error);
      if(error.response)
        return error.response.status
    })
  }
  updateData()
}

export default updateApi;
