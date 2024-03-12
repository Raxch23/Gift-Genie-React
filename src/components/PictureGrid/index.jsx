import PictureCard from "../PictureCard";

const PictureGrid = ({ pictureArray }) => {
  console.log(pictureArray);
  return (
    <div>
      {pictureArray.map((picture,index) => (
        <PictureCard key={index} picture={picture}  />
      ))}
    </div>
  );
};
export default PictureGrid;
