import Main from "../../components/Main/index.jsx";
import "./style.css";
import { Card, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";

const YourCards = () => {
  const cardArray = JSON.parse(localStorage.getItem("saveCardArray"));
  console.log(cardArray);
  const handlePictureDownload = (event) => {
    const pdfCard = document.getElementById("selectedImg");
    console.log(pdfCard);
    const htmlString = `<img src="https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg"/>`;
    const htmlFrame = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YourCards</title>
  </head>
  <body>
  ${htmlString}
  </body>
</html>`;
    const doc = new jsPDF();
    doc.text(htmlFrame, 10, 10);
    doc.save("a4.pdf");
    console.log(doc);
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
              <Button onClick={handlePictureDownload} type="button">
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
