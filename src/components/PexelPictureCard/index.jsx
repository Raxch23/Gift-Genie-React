import Card from "react-bootstrap/Card"
const PexelPictureCard=({picture})=>{
    // console.log(picture.urls.thumb)
    return(
        <Card key= {picture.id} style={{width:"16em" ,padding:"12px 12px 24px 12px", margin:"10px 0",boxShadow: "1px 1px 5px grey"
}} >
            <Card.Img src={picture.src.small} />
        </Card>
    )
}

export default PexelPictureCard