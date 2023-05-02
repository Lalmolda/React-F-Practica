const Advert = ({ ... ad }) => {
    return(
    ad && 
    <div>
        <span>Nombre: {ad.name}</span> 
        <br></br>
        <span>Precio: {ad.price}</span> 
        <br></br>
            {ad.sale?<span> En venta </span>
            :<span> Se compra </span>}
        <br></br>
        <span>Tags: {ad.tags}</span> 
        <hr></hr>
    </div>
    )
}


export default Advert;