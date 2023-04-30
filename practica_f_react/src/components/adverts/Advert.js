import RequireAuth from '../auth/RequireAuth';


const Advert = ({ ... ad }) => {
    return(
    ad && 
    <RequireAuth>
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
        </RequireAuth>

    )
}


export default Advert;