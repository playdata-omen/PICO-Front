import React, { useState, useEffect } from 'react'
import styles from './MainContents.module.css'
import { useNavigate } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import picoLogo from '../../../img/pico-logo.png'
import { category_actions } from '../../../_actions/category_actions';
import { FETCH_CATEGORY_REQUEST } from '../../../_actions/type';

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
      function(){
        navigate(`/searchResult/category/${category}`)
      }, 700
    )
  }

  useEffect(() => {
    console.log(categories)
    // dispatch(category_actions.fetchCategories())
  },[])

  return (
    <div className={styles.content}>
      <div className={styles.contentLeft}>

        <h3>
          나에게 알맞는 사진작가 찾기
        </h3>
        <hr/>
  

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

        <br/>

        <h3>
          사진 카테고리별 검색
        </h3>
        
        <hr />

        <div className={styles.categoryBtn}>
          
          {
            !err ?
            categories.map(category => 
              <button key={category.categoryIdx} onClick={() => handleCategorySearch(category.categoryIdx)}>{category.kind}</button>
            )

            :
            
            <div>{err}</div>
          }
        </div>

      </div>  

      <div className={styles.contentRight}>
        <div className={styles.imgContainer}>
          gif 이미지 넣을 예정 <br/>
          - 반응형으로 폰 화면일 땐 렌더 안함
          <img src={picoLogo} alt="test"/>
        </div>
      </div>

    </div>
  )
}

export default MainContents
