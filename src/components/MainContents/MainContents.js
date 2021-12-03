import React, { useState } from 'react'
import styles from './MainContents.module.css'
import { useNavigate } from 'react-router';

import SearchIcon from '@mui/icons-material/Search';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import picoLogo from '../../img/pico-logo.png'


function MainContents() {

  let navigate = useNavigate();

  // 여기션 내가 직접 카테고리를 state에 작성하였지만 
  // 서버연동이 되었을땐 enum 리스트 받아오는 방법 생각중
  const [category, setCategory] = useState(['스냅', '화보', '웨딩', '행사', '제품', '기타'])
  const [searchField, setSearchField] = useState("")

  const handleSearch = () => {
    searchField !== '' ? navigate(`/searchResult/${searchField}`) : alert('검색할 단어를 작성하세요')
  }

  const handleCategorySearch = (category) => {
    console.log(category)
    navigate(`/searchResult/${category}`)
  }

  return (
    <div className={styles.content}>

    <div className={styles.contentLeft}>

      <h3>
        나에게 알맞는 사진작가 찾기
      </h3>
      <hr />
 

      <form onSubmit={handleSearch}>
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
        {/* <Link to={{pathname: `/${this.props.testvalue}`, query: {backUrl}}} /> */}
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
          category.map(category => 
            <button onClick={() => handleCategorySearch(category)}>{category}</button>
          )
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
