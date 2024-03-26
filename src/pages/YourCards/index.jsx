import { useState } from "react";
import Main from "../../components/Main/index.jsx";
import "./style.css";
import { Card, Button, Carousel } from "react-bootstrap";

const YourCards = () => {
  const cardArray = JSON.parse(localStorage.getItem("saveCardArray"));

  console.log(cardArray);
  const [index, setIndex] = useState(0);
  //   const selectCard = (event) => {
  //     const pdfCard = document.getElementById("selectedImg");
  //     console.log(event.target.value);
  //     localStorage.setItem("card-to-print", event.target.value);
  // window.location.href="carddownload"
  //   };
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <main className="row" style={{ border: "1px solid black" }}>
      <div className="col-4">
        <h3>left side</h3>
      </div>
      <div className="col-8">
        <h3>right side</h3>
        {cardArray.length > 0 ? (
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {cardArray.map((card) => (
              <Carousel.Item key={card.id}>
                {/* <img src={card.imgSRC}/> */}
                <Card id="parent" className="card-container">
                  <Card.Body>
                    <div className="picture-div" style={{fontFamily:card.font, fontSize:card.fontSize+"pt", color:card.fontColor}}>
                      <div id="text-box" style={{left:card.position.x+"%", top:card.position.y+"%"}}>
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
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h1>No images found</h1>
        )}
      </div>
    </main>
  );
};
export default YourCards;
