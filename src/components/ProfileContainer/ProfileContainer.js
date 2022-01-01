import React, { useState, useEffect } from 'react';
import Info from './Contents/Info/Info';
import Work from './Contents/Work/Work';
import ProfileTop from './Contents/ProfileTop';
import styles from './ProfileContainer.module.css';
import Review from './Contents/Review/Review';
import { useSelector } from 'react-redux';
import { getPhotographerDetail } from '../../api/User';
import Spinner from '../Spinner/Spinner';

function ProfileContainer({ user }) {
  const userIdx = useSelector((store) => store.auth.user.userIdx);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [photographer, setPhotographer] = useState(null);
  const [grade, setGrade] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    user.isPhotographer &&
      getPhotographerDetail(user.userIdx).then((res) => {
        console.log(res);
        setPhotographer(res);
        setGrade(res.grade);
        setLoading(false);
      });
  }, [user]);

  const pageBtnContainer = (
    <div className={styles.pageBtnContainer}>
      <div>
        <input type="radio" checked={page === 1} readOnly />
        <button onClick={() => setPage(1)}>소개</button>
      </div>
      {user.isPhotographer && (
        <div>
          <input type="radio" checked={page === 2} readOnly />
          <button onClick={() => setPage(2)}>작업/사진</button>
        </div>
      )}
      {user.isPhotographer && (
        <div>
          <input type="radio" checked={page === 3} readOnly />
          <button onClick={() => setPage(3)}>리뷰</button>
        </div>
      )}
    </div>
  );

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.profileContentContainer}>
        <ProfileTop user={user} grade={grade} />

        {pageBtnContainer}

        <div>
          {page === 1 && <Info user={user} />}
          {page === 2 && user.isPhotographer && <Work user={user} />}
          {page === 3 && user.isPhotographer && <Review user={user} />}
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;
