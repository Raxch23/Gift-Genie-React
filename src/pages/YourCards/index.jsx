import Main from "../../components/Main/index.jsx";
import "./style.css";
import { Card, Button } from "react-bootstrap";

const YourCards = () => {
  const cardArray = JSON.parse(localStorage.getItem("saveCardArray"));
  console.log(cardArray);
  const selectCard = (event) => {
    const pdfCard = document.getElementById("selectedImg");
    console.log(event.target.value);
    localStorage.setItem("card-to-print", event.target.value);
window.location.href="carddownload"
  };

  return (
    <main className="row" style={{ border: "1px solid black" }}>
      <div className="col-4">
        <h3>left side</h3>
      </div>
      <div className="col-8">
        <h3>right side</h3>
        <div>
          {cardArray.map((card) => (
            <Card
              id="selectedImg"
              key={card.pid}
              style={{
                width: "16em",
                padding: "12px 12px 24px 12px",
                margin: "10px 0",
                boxShadow: "1px 1px 5px grey",
              }}
            >
              <Card.Img src={card.imgSRC} alt="" />
              <Button onClick={selectCard}   value={card.pid} type="button">
                Print
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};
export default YourCards;
