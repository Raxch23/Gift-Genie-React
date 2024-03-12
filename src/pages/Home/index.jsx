const appId = "566894";
const accessKey = "yWH9hjEhFXjQhvtQPA8HDnyVzi_ocqp0JvHQDdzE9jA";
const secretKey = "tLxOXBxVmBk3PeUzYuiAhr1MWH-HTTy3Crg4fIDaax8";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import PictureGrid from "../../components/PictureGrid/index.jsx";
import Button from "react-bootstrap/Button";
import pexelsApi from "../../utils/pexelsAPI.js";
const Home = () => {
  const [pictureArray, setPictureArray] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  async function handleSubmit(e) {
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
          accessKey
      );
      const data = await response.json();
      setPictureArray(data.results);
      console.log(pictureArray);
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
        },
      });
      console.log(response.data.photos)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(pictureArray);
  return (
    <main className="row" style={{ border: "1px solid black" }}>
      <div className="col-4">
        <h3>Search for an Image</h3>
        <form onSubmit={handleSubmit}>
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
      </div>
      <div className="col-8">
        <h3>Select your Image</h3>
        <Button type="button" onClick={pexelSearch}>
          Search with Pexel
        </Button>
        {pictureArray.length === 10 ? (
          <PictureGrid pictureArray={pictureArray} />
        ) : (
          <h3>error</h3>
        )}
      </div>
    </main>
  );
};
export default Home;
