import React from 'react'
import { useParams } from 'react-router-dom'
import styles from '../Pages.module.css'

import SearchResultContainer from '../../components/SearchResultContainer/SearchResultContainer';


function SearchResultPage() {
  let { type, search } = useParams();

  return (
    <div className={styles.container}>
      <SearchResultContainer type={type} search={search} />
    </div>
  )
}

export default SearchResultPage
