import Card from "react-bootstrap/Card"
const PictureCard=({picture})=>{
    // console.log(picture.urls.thumb)
    return(
        <Card key= {picture.id} >
            {/* <Card.Img src={picture.urls.thumb} /> */}
        </Card>
    )
}

export default PictureCard