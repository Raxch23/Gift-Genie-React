import { useState, useEffect } from "react";
import Main from "../../components/Main/index.jsx";
import { Card, Form, Button, CardImg } from "react-bootstrap";
import pexelsApi from "../../utils/pexelsAPI.js";
import "./style.css";

const CardGenerator = () => {
  const pid = localStorage.getItem("currentImage");
  const [singlePicture, setSinglePicture] = useState("");
  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_email: "",
    sender_name: "",
    sender_email: "",
    message: "",
  });

  const [cardObject, setCardObject] = useState({});
  const [saveCardArray, setSaveCardArray]=useState([])
  // works

  const getSingleImage = async () => {
    try {
      const response = await pexelsApi.get("/v1/photos/" + pid);
      setSinglePicture(response.data.src.original);
    } catch (error) {
      console.log(error);
    }
  };
  getSingleImage();
  // works

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("message-form", JSON.stringify(formData));
    setCardObject({
      recipient_name: formData.recipient_name,
      recipient_email: formData.recipient_email,
      sender_name: formData.sender_name,
      sender_email: formData.sender_email,
      message: formData.message,
      pid
    });
    setFormData({
      recipient_name: "",
      recipient_email: "",
      sender_name: "",
      sender_email: "",
      message: "",
    });
  };

const handleImageSave=()=>{
saveCardArray.push(cardObject)
localStorage.setItem("saveCardArray", JSON.stringify(saveCardArray))
window.location.href="/yourcards"
}

  return (
    <main className="row" style={{ border: "1px solid black" }}>
      <div className="col-4">
        <h3>left side</h3>
        <Form onSubmit={handleFormSubmit} className="card">
          <Form.Group className="mb-3" controlId="recipient_name">
            <Form.Label>Recipient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter recipient name"
              value={formData.recipient_name}
              name="recipient_name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recipient_email">
            <Form.Label>Recipient's Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter recipient email"
              value={formData.recipient_email}
              name="recipient_email"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="sender_name">
            <Form.Label>Sender Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sender name"
              value={formData.sender_name}
              name="sender_name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="sender_email">
            <Form.Label>Sender's Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter sender email"
              value={formData.sender_email}
              name="sender_email"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Enter Message"
              value={formData.message}
              name="message"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="col-8">
        <h3>Your Image</h3>
        <Card>
          <Card.Body id="picture-div">
            <h5 id="to-name"> {cardObject.recipient_name} </h5>
            <h5 id="card-message">{cardObject.message}</h5>
            <h5 id="from-name"> {cardObject.sender_name} </h5>
            <Card.Img src={singlePicture} />
          </Card.Body>
        </Card>
        <Button type="button" id="save-card" onClick={handleImageSave} >Save</Button>
      </div>
    </main>
  );
};

export default CardGenerator;
