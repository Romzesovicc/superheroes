import React, { Fragment, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './index.module.css';


const HeroData = ({ heroData }) => {
  const history = useHistory();

  const showHero = useCallback(() => {
    const { id } = heroData;
    history.push(`/hero/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroData]);

  return (
    <Fragment key={heroData.id}>
      <div className={styles.heroBlock} onClick={showHero} role='presentation'>
        <img src={heroData.image} alt='hero_img' />
        <p>{heroData.nickName}</p>
      </div>
    </Fragment>
  );
};
export default HeroData;
