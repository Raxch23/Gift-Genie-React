import Card from "react-bootstrap/Card"
const PexelPictureCard=({picture})=>{
    // console.log(picture.urls.thumb)
    return(
        <Card key= {picture.id} >
            <Card.Img src={picture.src.small} />
        </Card>
    )
}

export default PexelPictureCard