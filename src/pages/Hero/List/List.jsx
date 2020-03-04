import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './List.module.scss';
import Paginator from '../../../common/Paginator/Paginator';
import { getHeroes } from '../../../store/hero/actions';
import { heroesSelector } from '../../../store/hero/selectors';
import HeroData from '../HeroData';
import Routes from '../../../config/routes';

const PAGE_SIZE = 5;

const HeroList = () => {
  const [currentPage, setPage] = useState(1);
  const dispatch = useDispatch();
  const heroes = useSelector(heroesSelector);
  const history = useHistory();

  useEffect(() => {
    dispatch(getHeroes({
      skip: (currentPage * PAGE_SIZE) - PAGE_SIZE,
      limit: PAGE_SIZE,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = useCallback((page) => {
    setPage(page);
  }, [setPage]);

  const addHero = useCallback(() => {
    history.push(Routes.ADD_HERO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const allHeroes = useMemo(() => heroes.map((heroData) => (
    <HeroData
      heroData={heroData}
      key={heroData.id}
    />
  )),
  [heroes]);

  return (
    <div className={styles.container}>
      <div className={styles.heroBlock}>
        {allHeroes}
      </div>
      <div className={styles.container}>
        <button onClick={addHero}>Add heroes</button>
        <Paginator onChangePage={handlePageChange} total={100} pageSize={PAGE_SIZE} />
      </div>
    </div>
  );
};

export default HeroList;
