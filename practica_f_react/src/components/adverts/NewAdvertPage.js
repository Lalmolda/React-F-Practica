import { useState } from 'react';
import { createTweet } from './service';
import { useNavigate } from 'react-router-dom';

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
    <div></div>
  );
};

export default NewAdvertPage;

