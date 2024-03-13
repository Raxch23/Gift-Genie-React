import UnsplashPictureCard from "../UnsplashPictureCard";

const UnsplashPictureGrid = ({ unsplashPictureArray }) => {
  return (
    <div>
      {unsplashPictureArray.map((picture,index) => (
        <UnsplashPictureCard key={index} picture={picture}  />
      ))}
    </div>
  );
};
export default UnsplashPictureGrid;
