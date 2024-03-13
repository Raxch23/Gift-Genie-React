import Card from "react-bootstrap/Card"
const UnsplashPictureCard=({picture})=>{
    // console.log(picture.urls.thumb)
    return(
        <Card key= {picture.id} >
            <Card.Img src={picture.urls.thumb} />
        </Card>
    )
}

export default UnsplashPictureCard