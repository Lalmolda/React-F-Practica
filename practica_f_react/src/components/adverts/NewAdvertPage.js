import { useState } from 'react';
import { createTweet } from './service';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/button';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS = 140;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      //const tweet = await createTweet({ content });
      setIsLoading(false);
      //navigate(`/tweets/${tweet.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const isDisabled = isLoading || content.length < MIN_CHARACTERS;
  const characters = `${content.length} / ${MAX_CHARACTERS} characters`;

  return (
    <div>
      <form>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" required/>

          <label htmlFor="transaction">Compra / Venta:</label>
            <option value="compra">Compra</option>
            <option value="venta">Venta</option>
         
        <label htmlFor="tags">Tags disponibles:</label>
       
          <option value="tag1">Tag 1</option>
          <option value="tag2">Tag 2</option>
          <option value="tag3">Tag 3</option>
        

        <label htmlFor="price">Precio:</label>
        <input type="number" id="price" name="price" required/>

        <label htmlFor="photo">Foto:</label>
        <input type="file" id="photo" name="photo" accept="image/*" required/>
        <Button/>
      </form>
    </div>
  );
};

export default NewAdvertPage;

