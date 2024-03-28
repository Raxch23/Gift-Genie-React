import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PexelPictureGrid from "../../components/PexelPictureGrid/index.jsx";
import pexelsApi from "../../utils/pexelsAPI.js";

const Home = () => {
  // const [unsplashPictureArray, setUnsplashPictureArray] = useState([{}]);
  const [pexelPictureArray, setPexelPictureArray] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(1);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePageClick = (event) => {
    const targetPage = parseInt(event.target.innerText);
    console.log(targetPage);
    handlePageChange(targetPage);
    setActive(targetPage);
  };

  async function pexelSearch(page) {
    if (!searchTerm) {
      return false;
    }
    try {
      const response = await pexelsApi.get("/v1/search", {
        params: {
          query: searchTerm,
          per_page: 10,
          total_results: 80,
          orientation: "landscape",
          page,
        },

      });
      document.querySelector(".search-bar").style.display="none"
      document.querySelector(".subtitle").style.display = "block"
      setPexelPictureArray(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  }
  const handlePageChange = (page) => {
    setPage(page);
    pexelSearch(page);
  };

  return (
    <main className="row mt-5" >
      <div className="col-12">
        <div className="search-bar">
          <h3>Search for an Image</h3>

          <input
            type="text"
            id="Search-term"
            onChange={handleInputChange}
            value={searchTerm}
          />
          <button
            type="click"
            onClick={() => pexelSearch(page)}
            id="Search-btn"
            className="btn"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="col-12">
        <h3   className="subtitle" style={{display:"none"}}>Select your Image</h3>
      </div>
      <div className="row mt-2">
        {pexelPictureArray.length === 10 ? (
          <PexelPictureGrid
            pexelPictureArray={pexelPictureArray}
            page={page}
            handlePageClick={handlePageClick}
            active={active}
          />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};
export default Home;
