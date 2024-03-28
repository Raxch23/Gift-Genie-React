import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import pexelsApi from "../../utils/pexelsAPI.js";
import "./style.css";
import { SketchPicker } from "react-color";
import RangeSlider from "react-bootstrap-range-slider";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const CardGenerator = () => {
  const pid = localStorage.getItem("currentImage");
  const [singlePicture, setSinglePicture] = useState("");
  const [selectedFont, setSelectedFont] = useState("georgia");
  const [selectedColor, setSelectedColor] = useState("");
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "13",
    g: "110",
    b: "253",
    a: "1",
  });

  const [styleData, setStyleData] = useState({
    font: "",
    fontColor: "",
    fontSize: "1" + "em",
  });

  const [leftPosition, setLeftPosition] = useState(40);
  // const [rightPosition, setRightPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(40);
  // const [bottomPosition, setBottomPosition] = useState(0);

  const [position, setPosition] = useState({ x: 40, y: 40 });

  const styles = {
    // fontSize: styleData.fontSize, fontColor:styleData.fontColor, fontFamily:styleData.font
    h5: {
      fontFamily: styleData.font,
      fontSize: styleData.fontSize + "em",
      color: styleData.fontColor,
    },

    textBox: {
      left: position.x + "%",
      top: position.y + "%",
    },
  };
  const [formData, setFormData] = useState({
    recipient_name: "",
    recipient_email: "",
    sender_name: "",
    sender_email: "",
    message: "",
  });

  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [cardObject, setCardObject] = useState({});
  const [saveCardArray, setSaveCardArray] = useState(
    JSON.parse(localStorage.getItem("saveCardArray")) || []
  );
  // works
  // useEffect(() => {
  //   if (error) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [error]);

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
  const handleColorChange = (event) => {
    setSelectedColor(
      `rgba(${sketchPickerColor.r},${sketchPickerColor.g},${sketchPickerColor.b},${sketchPickerColor.a})`
    );
    setStyleData({ ...styleData, ["fontColor"]: selectedColor });
    setSketchPickerColor({
      r: event.rgb.r.toString(),
      g: event.rgb.g.toString(),
      b: event.rgb.b.toString(),
      a: event.rgb.a.toString(),
    });

    console.log(styleData);
  };
  const moveMessage = (event) => {
    const { name, value } = event.target;

    if (name === "left") {
      setLeftPosition(leftPosition - 1);
    }

    if (name === "right") {
      setLeftPosition(leftPosition + 1);
    }

    if (name === "top") {
      setTopPosition(topPosition - 1);
    }

    if (name === "bottom") {
      setTopPosition(topPosition + 1);
    }

    setPosition({ x: leftPosition, y: topPosition });
  };

  const handleStyleChange = (event) => {
    const { name, value } = event.target;
    setStyleData({ ...styleData, [name]: value });
    setSelectedFont(styleData.font);
    // document.querySelector(".card-text").style.setProperty("--fontFamily",selectedFont)
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    localStorage.setItem("message-form", JSON.stringify(formData));
    setCardObject({
      recipient_name: formData.recipient_name,
      recipient_email: formData.recipient_email,
      sender_name: formData.sender_name,
      sender_email: formData.sender_email,
      message: formData.message,
      pid,
      imgSRC: singlePicture,
      font: formData.font,
    });
    document.getElementById("style-card").style.display = "block";
    document.getElementById("message-card").style.display = "none";
  };

  const handleImageSave = (e) => {
    e.preventDefault();

    const finalCard = {
      recipient_name: formData.recipient_name,
      recipient_email: formData.recipient_email,
      sender_name: formData.sender_name,
      sender_email: formData.sender_email,
      message: formData.message,
      pid,
      imgSRC: singlePicture,
      font: styleData.font,
      fontColor: styleData.fontColor,
      fontSize: styleData.fontSize,
      position: {
        x: position.x,
        y: position.y,
      },
      id: uuidv4(),
    };
    saveCardArray.push(finalCard);
    setSaveCardArray(saveCardArray);
    localStorage.setItem("saveCardArray", JSON.stringify(saveCardArray));

    setFormData({
      recipient_name: "",
      recipient_email: "",
      sender_name: "",
      sender_email: "",
      message: "",
      font: "",
    });
    window.location.href = "/yourcards";
  };

  return (
    <>
      <Row style={{ maxWidth: "1500px", marginTop: "1em" }}></Row>
      <Row
        style={{
          maxWidth: "1500px",
          marginTop: "1em",
          marginLeft: "3em",
        }}
      >
        <Col lg={4}>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleFormSubmit}
            className="card"
            id="message-card"
            style={{ padding: "1em" }}
          >
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your message!
            </Alert>
            <Form.Group className="mb-3" controlId="recipient_name">
              <Form.Label>Recipient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient name"
                value={formData.recipient_name}
                name="recipient_name"
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                recipient name is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="recipient_email">
              <Form.Label>Recipient's Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter recipient email"
                value={formData.recipient_email}
                name="recipient_email"
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                recipient email is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sender_name">
              <Form.Label>Sender Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sender name"
                value={formData.sender_name}
                name="sender_name"
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                sender name is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sender_email">
              <Form.Label>Sender's Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter sender email"
                value={formData.sender_email}
                name="sender_email"
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                sender email is required!
              </Form.Control.Feedback>
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
                required
              />
              <Form.Control.Feedback type="invalid">
                message is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={
                !(
                  formData.recipient_name &&
                  formData.recipient_email &&
                  formData.sender_name &&
                  formData.sender_email &&
                  formData.message
                )
              }
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
          <Card id="style-card" style={{ width: "100%", display: "none" }}>
            <Form onSubmit={handleImageSave}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ width: "40%" }}>
                  <Form.Label>Select Your Font</Form.Label>

                  <Form.Select
                    name="font"
                    onChange={handleStyleChange}
                    aria-label="Select Font"
                  >
                    <option value='"Georgia","Times New Roman", Times, serif'>
                      Georgia
                    </option>
                    <option value="Tangerine, cursive">Tangerine</option>
                    <option value='"Notable", sans-serif'>Notable</option>
                    <option value='"Lobster", cursive'>Lobster</option>
                  </Form.Select>
                </div>
                <div style={{ width: "40%" }}>
                  <Form.Label>Font Size</Form.Label>

                  <RangeSlider
                    min="1.0"
                    max="1.4"
                    step=".1"
                    value={styleData.fontSize}
                    name="fontSize"
                    onChange={handleStyleChange}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-around",
                  marginTop: "2em",
                }}
              >
                <div
                  style={{
                    margin: "2em",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Label>Position your Message</Form.Label>

                  <ButtonGroup
                    style={{
                      height: "fit-content",
                    }}
                  >
                    <Button
                      type="button"
                      value={leftPosition}
                      name="left"
                      onClick={(event) => moveMessage(event)}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    <Button
                      value={topPosition}
                      name="top"
                      onClick={(event) => moveMessage(event)}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </Button>
                    <Button
                      value={leftPosition}
                      name="right"
                      onClick={(event) => moveMessage(event)}
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                    <Button
                      value={topPosition}
                      name="bottom"
                      onClick={(event) => moveMessage(event)}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </Button>
                  </ButtonGroup>
                </div>
                <Form.Control
                  type="hidden"
                  id="exampleColorInput"
                  value={styleData.fontColor}
                  name="fontColor"
                  onChange={handleStyleChange}
                />

                <SketchPicker
                  onChange={(e) => handleColorChange(e)}
                  color={sketchPickerColor}
                  value={sketchPickerColor}
                />
              </div>
              <Button type="submit" id="save-card">
                Save
              </Button>
            </Form>
          </Card>
        </Col>
        <Col lg={7}>
          <Row>
            <Col lg={1}></Col>

            <Col lg={10}>
              <Row>
                <h3>Style your Card</h3>
              </Row>
              <Card id="parent" className="card-container">
                <Card.Body>
                  <div className="picture-div" style={styles.h5}>
                    <div id="text-box" style={styles.textBox}>
                      <h5 className="card-text" style={styles.h5} id="to-name">
                        {" "}
                        {cardObject.recipient_name}{" "}
                      </h5>
                      <h5
                        className="card-text"
                        style={styles.h5}
                        id="card-message"
                      >
                        {cardObject.message}
                      </h5>
                      <h5
                        className="card-text"
                        style={styles.h5}
                        id="from-name"
                      >
                        {" "}
                        {cardObject.sender_name}{" "}
                      </h5>
                    </div>
                    <Card.Img src={singlePicture} className="card-img" />{" "}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={1}></Col>
          </Row>

          <Row>
            <Col lg={1}></Col>
            <Col lg={10}>
              {/* <Card id="style-card" style={{ width: "100%", marginTop: "2em" }}>
                <Form onSubmit={handleImageSave}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <div style={{ width: "40%" }}>
                      <Form.Label>Select Your Font</Form.Label>

                      <Form.Select
                        name="font"
                        onChange={handleStyleChange}
                        aria-label="Select Font"
                      >
                        <option value='"Georgia","Times New Roman", Times, serif'>
                          Georgia
                        </option>
                        <option value="Tangerine, cursive">Tangerine</option>
                        <option value='"Notable", sans-serif'>Notable</option>
                        <option value='"Lobster", cursive'>Lobster</option>
                      </Form.Select>
                    </div>
                    <div style={{ width: "40%" }}>
                      <Form.Label>Font Size</Form.Label>

                      <RangeSlider
                        min="1.0"
                        max="1.4"
                        step=".1"
                        value={styleData.fontSize}
                        name="fontSize"
                        onChange={handleStyleChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-around",
                      marginTop: "2em",
                    }}
                  >
                    <div
                      style={{
                        margin: "2em",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Form.Label>Position your Message</Form.Label>

                      <ButtonGroup
                        style={{
                          height: "fit-content",
                        }}
                      >
                        <Button
                          type="button"
                          value={leftPosition}
                          name="left"
                          onClick={(event) => moveMessage(event)}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </Button>
                        <Button
                          value={topPosition}
                          name="top"
                          onClick={(event) => moveMessage(event)}
                        >
                          <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        <Button
                          value={leftPosition}
                          name="right"
                          onClick={(event) => moveMessage(event)}
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                        <Button
                          value={topPosition}
                          name="bottom"
                          onClick={(event) => moveMessage(event)}
                        >
                          <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                      </ButtonGroup>
                    </div>
                    <Form.Control
                      type="hidden"
                      id="exampleColorInput"
                      value={styleData.fontColor}
                      name="fontColor"
                      onChange={handleStyleChange}
                    />

                    <SketchPicker
                      onChange={(e) => handleColorChange(e)}
                      color={sketchPickerColor}
                      value={sketchPickerColor}
                    />
                  </div>
                  <Button type="submit" id="save-card">
                    Save
                  </Button>
                </Form>
              </Card> */}
            </Col>
            <Col lg={1}></Col>
          </Row>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </>
  );
};

export default CardGenerator;
