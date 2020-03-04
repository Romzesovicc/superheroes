import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Paginator.module.scss';

const Paginator = ({
  total: initialTotal, initialPage, pageSize: initialPageSize, onChangePage,
}) => {
  const [total, setTotal] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pages, setPages] = useState([]);

  const setPaginator = useCallback((page) => {
    const totalPages = Math.ceil(total / pageSize);
    let startPage;
    let endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else if (page <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (page + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = page - 5;
      endPage = page + 4;
    }

    const newPages = [...Array((endPage + 1) - startPage).keys()]
      .map((i) => startPage + i);

    setCurrentPage(page);
    setPages(newPages);
  }, [setPages, setCurrentPage, total, pageSize]);

  useEffect(() => {
    setPaginator(1);
  }, [setPaginator]);

  useEffect(() => {
    if (initialPage && initialPage !== currentPage) setPaginator(initialPage);
  }, [initialPage, currentPage, setPaginator]);

  useEffect(() => {
    if (total !== initialTotal) {
      setTotal(initialTotal);
    }
    if (pageSize !== initialPageSize) {
      setPageSize(initialPageSize);
    }
    setPaginator(currentPage);
  }, [total, initialTotal, initialPageSize, pageSize, setPaginator, currentPage]);

  const setPage = useCallback((page) => {
    if (page < 1 || page > Math.ceil(initialTotal / pageSize)) {
      return;
    }
    setPaginator(page);
    onChangePage(page);
  }, [setPaginator, onChangePage, initialTotal, pageSize]);

  if (total <= pageSize) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem} onClick={() => setPage(1)}>&laquo;</li>
        <li className={styles.listItem} onClick={() => setPage(currentPage - 1)}>
          &lsaquo;
        </li>
        {pages.map((page, key) => (
          <li
            key={key}
            onClick={() => setPage(page)}
            className={classNames(styles.listItem, { [styles.active]: page === currentPage })}
          >
            {page}
          </li>
        ))}
        <li className={styles.listItem} onClick={() => setPage(currentPage + 1)}>
          &rsaquo;
        </li>
        <li className={styles.listItem} onClick={() => setPage(Math.ceil(total / pageSize))}>
          &raquo;
        </li>
      </ul>
    </div>
  );
};

Paginator.propTypes = {
  total: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};

Paginator.defaultProps = {
  initialPage: 1,
  pageSize: 10,
};

export default Paginator;
