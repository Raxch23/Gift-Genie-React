import PexelPictureCard from "../PexelPictureCard";

const PexelPictureGrid = ({ pexelPictureArray }) => {
  return (
    <div>
      {pexelPictureArray.map((picture,index) => (
        <PexelPictureCard key={index} picture={picture}  />
      ))}
    </div>
  );
};
export default PexelPictureGrid;
