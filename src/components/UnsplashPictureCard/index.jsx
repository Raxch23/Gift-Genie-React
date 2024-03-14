import Card from "react-bootstrap/Card";
const UnsplashPictureCard = ({ picture }) => {
  // console.log(picture.urls.thumb)
  return (
    <Card
      key={picture.id}
      style={{ width: "12em", padding: "10px 10px 20px 10px" }}
    >
      <Card.Img src={picture.urls.thumb} />
    </Card>
  );
};

export default UnsplashPictureCard;
