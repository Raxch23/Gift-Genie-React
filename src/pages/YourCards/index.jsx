import { useState } from "react";
import Main from "../../components/Main/index.jsx";
import "./style.css";
import { Card, Button, Carousel, Row, Col } from "react-bootstrap";
import jspdf from "jspdf";
import html2canvas from "html2canvas";

const YourCards = () => {
  // const cardArray = JSON.parse(localStorage.getItem("saveCardArray"));
  const [cardArray, setCardArray] = useState(
    JSON.parse(localStorage.getItem("saveCardArray"))
  );

  console.log(cardArray);
  const [index, setIndex] = useState(0);
  const htmlStringToPdf = async (htmlString) => {
    let iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    document.getElementById("root").appendChild(iframe);
    let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    iframedoc.body.innerHTML = htmlString;

    let canvas = await html2canvas(iframedoc.body, {});
    // Convert the iframe into a PNG image using canvas.
    let imgData = canvas.toDataURL("image/png");

    // Create a PDF document and add the image as a page.
    const doc = new jspdf({
      format: "a4",
      unit: "mm",
    });
    doc.addImage(imgData, "PNG", 0, 0, 210, 297);
    doc.save("YourCards.pdf");
    // Get the file as blob output.
    let blob = doc.output("blob");
    console.log(blob)
    // Remove the iframe from the document when the file is generated.
    // document.body.removeChild(iframe);
    document.getElementById("root").removeChild(iframe)
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleImgDelete = (event) => {
    console.log(event.target.value);
    const updatedCardArray = cardArray.filter(
      (card) => card.id !== event.target.value
    );
    setCardArray(updatedCardArray);
    localStorage.setItem("saveCardArray", JSON.stringify(cardArray));
  };

  return (
    <>
      <Row>
        <Col lg={12}>
          <h2>Your Cards</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={2}></Col>

        <Col lg={8}>
          {cardArray.length > 0 ? (
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              indicators={false}
              style={{ width: "50em", margin: "10px auto" }}
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
                  <Button
                    type="button"
                    className="m-1"
                    onClick={(htmlString) => {
                      htmlStringToPdf("<h1>test</h1>");
                    }}
                  >
                    Print
                  </Button>
                  <Button type="button" className="m-1">
                    Send
                  </Button>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <h1>No images found</h1>
          )}
        </Col>
        <Col lg={2}></Col>
      </Row>
    </>
  );
};
export default YourCards;
