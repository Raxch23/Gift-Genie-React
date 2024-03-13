import PexelPictureCard from "../PexelPictureCard";
import Pagination from "react-bootstrap/Pagination";

const PexelPictureGrid = ({ pexelPictureArray, page, handlePageChange}) => {
  console.log(page)
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div
      className="col-12"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {pexelPictureArray.map((picture, index) => (
        <PexelPictureCard key={index} picture={picture} />
      ))}
      <div>
        <Pagination value={page} onClick={handlePageChange} >{items}</Pagination>
        <br />
      </div>
    </div>
  );
};
export default PexelPictureGrid;
