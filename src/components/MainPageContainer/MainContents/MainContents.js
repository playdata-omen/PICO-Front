import React, { useState, useEffect } from 'react'
import styles from './MainContents.module.css'
import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import picoLogo from '../../../img/pico-logo.png'

function MainContents() {

  let navigate = useNavigate();
  const categories = useSelector(store => store.categories.categories)

  const [searchField, setSearchField] = useState("")

  const handleSearch = (event) => {
    event.preventDefault()
    searchField !== '' ? navigate(`/searchResult/${searchField}`) : alert('검색할 단어를 작성하세요')
  }

  const handleCategorySearch = category => {
    setTimeout(
      function(){
        navigate(`/searchResult/${category}`)
      }, 700
    )
    console.log(category)
  }

  useEffect(async() => {
    console.log(categories)
    // const data = await getCategoryAll();    
    // alert(data)
    // console.log(data)
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
        
        <div className={`${styles.searchBar} ${styles.photoUpload}`} onClick={() => console.log('hello')}>
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
            categories.map(category => 
              <button onClick={() => handleCategorySearch(Object.values(category)[0])}>{Object.values(category)[1]}</button>
            )
          }
          {/* {
            category.map(category => 
              <button onClick={() => handleCategorySearch(category)} key={category}>{category}</button>
            )
          } */}
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
