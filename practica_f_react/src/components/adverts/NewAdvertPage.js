import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/button';
import { createAd } from './service';
import { Link } from 'react-router-dom';


const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState();
  const [tag, setTag] = useState([]);
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState();

  const handleName = event => {
    setName(event.target.value);
    console.log("SOY SETname ENTRO Y MI VALUE ES "+event.target.value);
    //console.log(formData)
  };

  const handleSale = event => {
    if(event.target.value=="compra"){
      setSale(false);
    }
    if(event.target.value=="venta"){
      setSale(true);
    }
    console.log("SOY SETname ENTRO Y MI VALUE ES "+event.target.value);
    console.log(typeof sale);
  };

  const handleTag = event => {
    const tagValue = event.target.value;    
    setTag([tagValue])
    console.log("EL VECTOR DE TAGS ES "+tag)
  }

  const handlePrice = event => {
    setPrice(event.target.value)
  }

  const handlePicture = event => {
    const picture = (event.target.files[0]);
    console.log(picture)
    setPicture(picture)
  }


  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    formData.append('tags', tag);
    if(picture){
      formData.append('photo', picture);
    }

    try {
      const ad = await createAd( formData );
      navigate('/adverts/'+ad.id);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form className="NewAdvertPage" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre: </label>
        <input type="text" id="name" name="name" onChange={handleName} required/>
        <br></br>
          Compra
            <input type="radio" name="transaction" value="compra" onChange={handleSale} required/>
          Venta
            <input type="radio" name="transaction" value="venta" onChange={handleSale} required/>
        <br></br>
        <label htmlFor="tags">Tags disponibles: </label>
        <select id="tags" name="tags" size="1" onChange={handleTag} required defaultValue={""}>
            <option value="" disabled>Selecciona un tag</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="mobile">Mobile</option>
            <option value="motor">Motor</option>
            <option value="work">Work</option>
        </select>
        <br></br>
        <label htmlFor="price">Precio: </label>
        <input type="number"name="price" onChange={handlePrice} required/>
        <br></br>
        <label htmlFor="photo">Foto: </label>
        <input type="file" name="picture" accept="image/*" onChange={handlePicture}/>
        <br></br>
        <br></br>
        <Button>Crear anuncio</Button>
      </form>
      <div>
      <br></br>
        <Button as={Link} variant="primary" to="/adverts">
          Ir a anuncios publicados
        </Button>
      </div>
    </div>
  );
};

export default NewAdvertPage;

