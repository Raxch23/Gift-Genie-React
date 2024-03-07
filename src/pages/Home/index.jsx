const appId = "566894";
const accessKey = "yWH9hjEhFXjQhvtQPA8HDnyVzi_ocqp0JvHQDdzE9jA";
const secretKey = "tLxOXBxVmBk3PeUzYuiAhr1MWH-HTTy3Crg4fIDaax8";

import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/index.jsx";
import PictureGrid from "../../components/PictureGrid/index.jsx";
const Home = () => {
  const [pictureArray, setPictureArray] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  // const handleClick = async (e) => {
  //   console.log(searchTerm);
  //   const response = await fetch(
  //     "https://api.unsplash.com/search/photos?page=1&query=" +
  //       searchTerm +
  //       "&orientation=portrait&client_id=" +
  //       accessKey
  //   );
  //   const data = await response.json();
  //   setPictureArray(data.results);
  // };
  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    fetch(
      "https://api.unsplash.com/search/photos?page=1&query=" +
        searchTerm +
        "&orientation=portrait&client_id=" +
        accessKey
    )
      .then((response) => response.json())
      .then((data) => {
        setPictureArray(data.results);
      })

      .catch((err) => setError(err));
  }, [searchTerm]);

  return (
    <main className="row" style={{ border: "1px solid black" }}>
      <div className="col-4">
        <h3>Search for an Image</h3>
        <SearchBar
          handleInputChange={handleInputChange}
          // handleClick={handleClick}
          searchTerm={searchTerm}
        />
      </div>
      <div className="col-8">
        <h3>Select your Image</h3>
        <PictureGrid pictureArray={pictureArray} />
      </div>
    </main>
  );
};
export default Home;
