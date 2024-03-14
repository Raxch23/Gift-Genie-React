import PexelPictureCard from "../PexelPictureCard";
import Pagination from "react-bootstrap/Pagination";
import{useState} from "react";
const PexelPictureGrid = ({ pexelPictureArray,page,handlePageClick, active}) => {
  // console.log(active)
  let items = [];
  for (let number = 1; number <= 8; number++) {
    items.push(
      <Pagination.Item key={number} value={number} active={number === active} >
        {number}
      </Pagination.Item>
    );
  }
// console.log(page)
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
        <Pagination onClick={handlePageClick}>{items}</Pagination>
        <br />
      </div>
    </div>
  );
};
export default PexelPictureGrid;
