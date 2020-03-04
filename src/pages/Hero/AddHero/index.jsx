import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addHero } from '../../../store/hero/actions';
import styles from './index.module.css';
import { heroSelectorMessage } from '../../../store/hero/selectors';
import Routes from '../../../config/routes';

const AddHero = () => {
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [powers, setPowers] = useState('');
  const [phrase, setPhrase] = useState('');
  const [file, setFile] = useState('');

  const dispatch = useDispatch();
  const message = useSelector(heroSelectorMessage);
  const history = useHistory();

  const handleNickChange = useCallback((e) => {
    setNick(e.target.value);
  }, [setNick]);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, [setDescription]);

  const handlePowersChange = useCallback((e) => {
    setPowers(e.target.value);
  }, [setPowers]);

  const handlePhraseChange = useCallback((e) => {
    setPhrase(e.target.value);
  }, [setPhrase]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData();
    data.append('fileData', file);
    data.append('fileData', nick);
    data.append('fileData', name);
    data.append('fileData', description);
    data.append('fileData', powers);
    data.append('fileData', phrase);
    dispatch(addHero(data));
  }, [file, nick, name, description, powers, phrase, dispatch]);

  const clickBack = useCallback(() => {
    history.push(Routes.HOME);
  }, [history]);


  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} encType='multipart/form-data' className={styles.addHeroBlockForm}>
        <div className={styles.heroData}>
          <h1>Add hero</h1>
          <input
            onChange={handleNickChange}
            placeholder='Enter nick name hero'
            type='text'
            name='nick_name'
            value={nick}
          />
          <input
            onChange={handleNameChange}
            placeholder='Enter real name hero'
            type='text'
            name='name'
            value={name}
          />
          <input
            onChange={handleDescriptionChange}
            placeholder='Enter origin description'
            type='text'
            name='description'
            value={description}
          />
          <input
            onChange={handlePowersChange}
            placeholder='Enter superpowers'
            type='text'
            name='superpowers'
            value={powers}
          />
          <input
            onChange={handlePhraseChange}
            placeholder='Enter catch phrase'
            type='text'
            name='phrase'
            value={phrase}
          />
          <input
            onChange={handleFileChange}
            type='file'
            name='fileData'
            required
          />
        </div>
        <div className={styles.btn}>
          <button type='submit'>Add</button>
          <button onClick={clickBack}>Back</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddHero;
