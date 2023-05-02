import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/button';
import { createAd } from './service';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 140;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState();
  const [tag, setTag] = useState([]);
  const [price, setPrice] = useState(0);

  const formData = {
    "name": name,
    "sale": sale,
    "price": price,
    "tags": tag,
  };

  const handleName = event => {
    setName(event.target.value);
    console.log("SOY SETname ENTRO Y MI VALUE ES "+event.target.value);
    console.log(formData)
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
    console.log("LLEGO A HANDLETAG")
    const tagValue = event.target.value;
    setTag([... tag, tagValue])
    console.log("EL VECTOR DE TAGS ES "+tag)
  }

  const handlePrice = event => {
    setPrice(event.target.value)
  }


 /* useEffect(() => {
    console.log("SOY SETCONTENT Y VALGO "+content);

}, content);*/

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const ad = await createAd( formData );
      //navigate(`/tweets/${tweet.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  //const isDisabled = isLoading || content.length < MIN_CHARACTERS;
  //const characters = `${content.length} / ${MAX_CHARACTERS} characters`;

  return (
    <div>
      <form className="NewAdvertPage" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre: </label>
        <input type="text" id="name" name="name" onChange={handleName} required/>
          <hr></hr>
          <label htmlFor="transaction">Compra / Venta: </label>
          Compra
            <input type="radio" name="transaction" value="compra" onChange={handleSale} />
          Venta
            <input type="radio" name="transaction" value="venta" onChange={handleSale}/>
         <hr></hr>
        <label htmlFor="tags">Tags disponibles: </label>
        <br></br>
        <select id="tags" name="tags" size="1" onChange={handleTag} required>
            <option value="" disabled selected>Selecciona un tag</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="mobile">Mobile</option>
            <option value="motor">Motor</option>
            <option value="work">Work</option>
        </select>
        <hr></hr>
        <label htmlFor="price">Precio: </label>
        <input type="number"name="price" onChange={handlePrice} required/>
        <hr></hr>
        <label htmlFor="photo">Foto: </label>
        <br></br>
        <input type="file" id="photo" name="photo" accept="image/*"/>
        <hr></hr>
        <Button>Crear anuncio</Button>
      </form>
    </div>
  );
};

export default NewAdvertPage;

