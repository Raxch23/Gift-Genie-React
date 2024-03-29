import PexelPictureCard from "../PexelPictureCard";
import Pagination from "react-bootstrap/Pagination";
import { Col } from "react-bootstrap";



const PexelPictureGrid = ({ pexelPictureArray,page,handlePageClick, active}) => {
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
    <Col
    sm={12}
    md={9}
    lg={7}
    xl={7}
    xxl={12}

      style={{
        display: "flex",
        margin:"0 auto",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {pexelPictureArray.map((picture, index) => (
        <PexelPictureCard key={index} picture={picture} />
      ))}
      <div className="mt-2">
        <Pagination onClick={handlePageClick}>{items}</Pagination>
        <br />
      </div>
    </Col>
  );
};
export default PexelPictureGrid;
