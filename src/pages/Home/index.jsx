import keys from "../../keys/unsplash.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import UnsplashPictureGrid from "../../components/UnsplashPictureGrid/index.jsx";
import PexelPictureGrid from "../../components/PexelPictureGrid/index.jsx";
import Button from "react-bootstrap/Button";
import pexelsApi from "../../utils/pexelsAPI.js";
const Home = () => {
  const [unsplashPictureArray, setUnsplashPictureArray] = useState([{}]);
  const [pexelPictureArray, setPexelPictureArray] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page,setPage]=useState(1)
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  async function unsplashHandleSubmit(e) {
    e.preventDefault();
    console.log(searchTerm);
    if (!searchTerm) {
      return false;
    }
    try {
      const response = await fetch(
        "https://api.unsplash.com/search/photos?page=1&query=" +
          searchTerm +
          "&orientation=portrait&client_id=" +
          keys.accessKey
      );
      const data = await response.json();
      setUnsplashPictureArray(data.results);
    } catch (error) {
      console.log(error);
    }

    // setPictureArray([{}])
  }

  async function pexelSearch(e) {
    console.log(searchTerm);
    if (!searchTerm) {
      return false;
    }
    try {
      const response = await pexelsApi.get("/v1/search", {
        params: {
          query: searchTerm,
          per_page:10,
          total_results:80,
          orientation:"landscape",
          page
        },
      });

      setPexelPictureArray(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  }
  const handlePageChange=(e)=>{
    setPage(e.target.value)
  }
  return (
    <main className="row">
      <div className="col-4">
        <h3>Search for an Image</h3>
        <form onSubmit={unsplashHandleSubmit}>
          <input
            type="text"
            id="Search-term"
            onChange={handleInputChange}
            value={searchTerm}
          />
          <button type="submit" id="Search-btn" className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <Button type="button" onClick={pexelSearch}>
          Search with Pexel
        </Button>
      </div>
      <div className="col-8">
        <h3>Select your Image</h3>

        {unsplashPictureArray.length === 10 ? (
          <UnsplashPictureGrid unsplashPictureArray={unsplashPictureArray} />
        ) : (
          <h3>error</h3>
        )}
      </div>
      <div className="row">
        {pexelPictureArray.length === 10 ? (
          <PexelPictureGrid pexelPictureArray={pexelPictureArray} page={page} handlePageChange={handlePageChange} />
        ) : (
          <h3>error</h3>
        )}
      </div>
    </main>
  );
};
export default Home;
