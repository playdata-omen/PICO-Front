import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { categorySearch } from '../../api/Search'
import MyInfoCard from '../Cards/MyInfoCard/MyInfoCard'
import Spinner from '../Spinner/Spinner'
import styles from './SearchResultContainer.module.css'

function SearchResultContainer({ type, search }) {
  let navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState()

  const photographerPage = photographerIdx => navigate(`/profile/${photographerIdx}`)

  useEffect( async() => {
    console.log(type)
    console.log(typeof (parseInt(search)))
    // type === 'text' && setResult(categorySearch(search))
    type === 'category' && setResult(await categorySearch(parseInt(search)))

    console.log(result)

    setLoading(false)
  }, [])

  return (

    loading ?

      <Spinner />

      :

      <div className={styles.container}>
        {
          result.map(res =>
            <div onClick={() => photographerPage(res.photographerIdx)}>
              <MyInfoCard user={res.user} />
            </div>
          )
        }
      </div>

  )
}

export default SearchResultContainer
