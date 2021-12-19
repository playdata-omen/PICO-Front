import React, { useState, useEffect } from 'react'
import styles from './MainContents.module.css'
import { useNavigate } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { category_actions } from '../../../_actions/category_actions';

function MainContents() {

  const dispatch = useDispatch();

  let navigate = useNavigate();
  const categories = useSelector(store => store.categories.categories)
  const err = useSelector(store => store.categories.error)

  const [searchField, setSearchField] = useState("")

  const handleSearch = (event) => {
    event.preventDefault()
    searchField !== '' ? navigate(`/searchResult/text/${searchField}`) : alert('검색할 단어를 작성하세요')
  }

  const handleCategorySearch = category => {
    setTimeout(
      function () {
        navigate(`/searchResult/category/${category}`)
      }, 700
    )
  }

  useEffect(() => {
    dispatch(category_actions.fetchCategories())
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.contentLeft}>

        <h3>
          나에게 알맞는 사진작가 찾기
        </h3>
        <hr />


        <form onSubmit={(event) => handleSearch(event)}>
          <div className={`${styles.searchBar} ${styles.search}`}>
            <input
              type="search"
              placeholder="작가 찾기"
              onChange={(e) => setSearchField(e.target.value)}
            />
            <a onClick={handleSearch}>
              <SearchIcon />
            </a>

          </div>
        </form>

        <div className={`${styles.searchBar} ${styles.photoUpload}`} onClick={() => navigate('imageSearch')}>
          <input
            type="button"
            value="이미지검색"
          />
          <a>
            <AddPhotoAlternateIcon />
          </a>
        </div>

        <br />

        <h3>
          사진 카테고리별 검색
        </h3>

        <hr />

        <div className={styles.categoryBtn}>
          {
            !err &&
              categories.map(category =>
                <button key={category.categoryIdx} onClick={() => handleCategorySearch(category.categoryIdx)}>{category.kind}</button>
              )
          }
        </div>

      </div>

      <ContentRight />


    </div>
  )
}

export default MainContents

function ContentRight() {

  const [index, setIndex] = useState(0)
  const [categories, setCategories] = useState(['Wedding', 'Product', 'Event', 'Snap', 'Look Book'])

  const nextCat = () => {
    setTimeout(
      function () {
        index > (categories.length - 2) ? setIndex(0) : setIndex(index + 1)
      }, 1500
    )
  }

  useEffect(() => {
    nextCat()
  }, [index])

  return (
    <div className={styles.contentRight}>
      <div className={styles.imgContainer}>
        <div className={styles.logo}>
          PIC<span>ture</span>
          O<span>f</span>
        </div>
        <div className={styles.animationContainer}>
          {
            categories.map((cat, i) =>
            <div key={cat}>
              <div key={cat} className={styles.radio}>
                <input
                  type="radio"
                  checked={index == i}
                />
                <label>{cat}</label>
              </div>
            </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
