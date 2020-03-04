import React, { useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';
import { deleteHero, getHero, updateHero } from '../../store/hero/actions';
import { heroSelector, heroSelectorShow } from '../../store/hero/selectors';
import Loader from '../../common/Loader';
import Routes from '../../config/routes';

const Hero = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState('');
  const history = useHistory();

  const params = useParams();
  const dispatch = useDispatch();
  const hero = useSelector(heroSelector);
  const show = useSelector(heroSelectorShow);

  useEffect(() => {
    if (params.id) {
      dispatch(getHero(params.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);


  const backClick = () => {
    history.push(Routes.HOME);
  };

  const edit = useCallback(() => {
    if (edit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [setIsEdit]);

  const destroyHero = useCallback(() => {
    if (params.id) {
      dispatch(deleteHero(params.id));
      history.push(Routes.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (params.id) {
      const data = new FormData();
      data.append('fileData', file);
      dispatch(updateHero(params.id, data));
    }
  }, [dispatch, params, file]);


  return (
    <div>
      <div className={styles.heroBlock}>
        { show
          ? (
            <div className={styles.heroData}>
              <img src={hero.image} alt='hero_img' />
              <p>{hero.realName}</p>
              <p>{hero.nickName}</p>
              <p>{hero.originDescription}</p>
              <p>{hero.superpowers}</p>
              <p>{hero.catchPhrase}</p>
              <div>
                <button onClick={backClick}>Back</button>
                <button onClick={edit}>Edit hero</button>
                <button onClick={destroyHero}>Delete hero</button>
              </div>
            </div>
          )
          : <Loader />}
        { isEdit
          ? (
            <form onSubmit={onSubmit} encType='multipart/form-data'>
              <input
                onChange={handleFileChange}
                type='file'
                name='fileData'
                accept='image/*'
                required
              />
              <button type='submit'>Send</button>
            </form>
          )
          : null}
      </div>
    </div>
  );
};

export default Hero;
