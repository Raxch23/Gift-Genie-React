import { useState } from "react";
import "./style.css";
import { Card, Button, Carousel, Row, Col, Container } from "react-bootstrap";

const importedArray = JSON.parse(localStorage.getItem("saveCardArray"));
const YourCards = () => {
  const [cardArray, setCardArray] = useState(importedArray);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleImgDelete = (event) => {
    const updatedCardArray = cardArray.filter(
      (card) => card.id !== event.target.value
    );
    localStorage.setItem("saveCardArray", JSON.stringify(updatedCardArray));
    setCardArray(updatedCardArray);
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col lg={12}>
          <h2>Your Cards</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={2} sm={0} xs={0}></Col>

        <Col lg={8} sm={12} xs={12}>
          {cardArray.length > 0 ? (
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              indicators={false}
              // style={{ width: "50em", margin: "10px auto" }}
            >
              {cardArray.map((card) => (
                <Carousel.Item key={card.id}>
                  {/* <img src={card.imgSRC}/> */}
                  <Card id="parent" className="card-container">
                    <Card.Body>
                      <div
                        className="picture-div"
                        style={{
                          fontFamily: card.font,
                          fontSize: card.fontSize + "pt",
                          color: card.fontColor,
                        }}
                      >
                        <div
                          id="text-box"
                          style={{
                            left: card.position.x + "%",
                            top: card.position.y + "%",
                          }}
                        >
                          <h5
                            className="card-text"
                            // style={styles.h5}
                            id="to-name"
                          >
                            {" "}
                            {card.recipient_name}{" "}
                          </h5>
                          <h5
                            className="card-text"
                            // style={styles.h5}
                            id="card-message"
                          >
                            {card.message}
                          </h5>
                          <h5
                            className="card-text"
                            // style={styles.h5}
                            id="from-name"
                          >
                            {" "}
                            {card.sender_name}{" "}
                          </h5>
                        </div>
                        <Card.Img src={card.imgSRC} className="card-img" />{" "}
                      </div>
                    </Card.Body>
                  </Card>
                  <Button
                    type="button"
                    className="m-1"
                    onClick={handleImgDelete}
                    value={card.id}
                  >
                    Delete
                  </Button>
                  {/* <Button type="button" className="m-1" onClick={getHtmlString}>
                    Print
                  </Button> */}
                  <Button type="button" className="m-1">
                    Send
                  </Button>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div>
              <h1>No images found</h1>
              <a href="/">
                <Button>Start Over</Button>
              </a>
            </div>
          )}
        </Col>
        <Col lg={2} sm={0} xs={0}></Col>
      </Row>
    </Container>
  );
};
export default YourCards;
