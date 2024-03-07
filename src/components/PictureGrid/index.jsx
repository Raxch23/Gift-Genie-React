import PictureCard from "../PictureCard";

const PictureGrid = ({ pictureArray }) => {
  console.log(pictureArray);
  return (
    <div>
      {pictureArray.map((picture) => (
        <PictureCard key={picture.id} picture={picture}  />
      ))}
    </div>
  );
};
export default PictureGrid;
