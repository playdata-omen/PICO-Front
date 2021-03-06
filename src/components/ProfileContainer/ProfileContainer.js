import React, { useState } from 'react'
import Info from './Contents/Info/Info'
import Work from './Contents/Work/Work'
import ProfileTop from './Contents/ProfileTop'
import styles from './ProfileContainer.module.css'

function ProfileContainer({ user }) {

  const [page, setPage] = useState(1)

  return (
    <div className={styles.container}>
      <div className={styles.profileContentContainer}>
        <ProfileTop user={user}/>
        <div className={styles.pageBtnContainer}>
          
          <div>
            <input type="radio" checked={page === 1}/>
            <button onClick={()=>setPage(1)}>소개</button>
          </div>
          { user.photographer && 
            (
            <div>
              <input type="radio" checked={page === 2}/>
              <button onClick={()=>setPage(2)}>작업/사진</button>
            </div>
            )
          }
          { user.photographer && 
            (
            <div>
              <input type="radio" checked={page === 3}/>
              <button onClick={()=>setPage(3)}>리뷰</button>
            </div>
            )
          }
        </div>

        <div>
          {page === 1 && <Info user={user}/>}
          {(page === 2 && user.photographer) && <Work user={user}/>}
          {(page === 3 && user.photographer) && <div>Review</div>}
        </div>
    
      </div>
    </div>
  )
}

export default ProfileContainer
