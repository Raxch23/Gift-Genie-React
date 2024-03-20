import fileDownload from "js-file-download";
import { useState } from "react";
import pexelsApi from "../../utils/pexelsAPI.js";
import {Card,Button} from "react-bootstrap"




const giftcard = () => {
const pid = localStorage.getItem("card-to-print");
const [singlePicture, setSinglePicture] = useState("");
const getSingleImage = async () => {
  try {
    const response = await pexelsApi.get("/v1/photos/" + pid);
    setSinglePicture(response.data.src.original);
  } catch (error) {
    console.log(error);
  }
};
getSingleImage();



    return (
      <main className="row" style={{ border: "1px solid black" }}>
        <div className="col-12">
          <Card>
            <Card.Img  src={singlePicture}/>
          </Card>
          <Button type="button">Download</Button>
        </div>  
      </main>
    );
};
export default giftcard;
