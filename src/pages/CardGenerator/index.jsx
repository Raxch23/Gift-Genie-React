import Main from "../../components/Main/index.jsx"
import pexelsApi from "../../utils/pexelsAPI.js";

const CardGenerator=()=>{
  const pid=localStorage.getItem("currentImage")
const getSingleImage=async()=>{
    try {
      const response = await pexelsApi.get("/v1/photos/"+pid)
      console.log(response.data.src.original);
      // setPexelPictureArray(response.data.photos);
    } catch (error) {
      console.log(error);
    }
}
getSingleImage()










  
    return (
      <main className="row" style={{ border: "1px solid black" }}>
        <div className="col-4">
          <h3>left side</h3>
        </div>
        <div className="col-8">
          <h3>right side</h3>
        </div>
      </main>
    );
}

export default CardGenerator