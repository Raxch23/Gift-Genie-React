import Card from "react-bootstrap/Card"
const PexelPictureCard=({picture})=>{
const handleImageSelect=(event)=>{
const pexelID = event.target.getAttribute("data-pid");
console.log(pexelID)
localStorage.setItem("currentImage", pexelID)
window.location.href="/cardGenerator"
}


    return(
        <Card key= {picture.id} style={{width:"16em" ,padding:"12px 12px 24px 12px", margin:"10px 0",boxShadow: "1px 1px 5px grey"
}} >
            <Card.Img src={picture.src.small} onClick={handleImageSelect} data-pid={picture.id} />
        </Card>
    )
}

export default PexelPictureCard