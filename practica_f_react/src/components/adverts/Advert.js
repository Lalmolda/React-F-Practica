

const Advert = ({ ... ad }) => {
    return(
    ad && 
        <div>
            {ad.name}
            <br></br>
            {ad.price}
            <br></br>
            {ad.sale?<span> venta </span>
            :<span> compra </span>}
            <br></br>
            {ad.tags}
            <hr></hr>
            </div>
    )
}


export default Advert;