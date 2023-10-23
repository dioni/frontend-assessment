import axios from "axios";

export async function getRealStateDataAPI() {  

  const resp = await axios({
    url: `https://s3.us-west-2.amazonaws.com/cdn.number8.com/LA/listings.json`,

    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });
  if (resp.data) {
    return resp.data  
  }  
}