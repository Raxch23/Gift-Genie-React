import UnsplashPictureCard from "../UnsplashPictureCard";

const UnsplashPictureGrid = ({ unsplashPictureArray }) => {
  return (
    <div className="row" style={{border:"1px solid green"}}>
      {unsplashPictureArray.map((picture,index) => (
        <UnsplashPictureCard key={index} picture={picture}  />
      ))}
    </div>
  );
};
export default UnsplashPictureGrid;
