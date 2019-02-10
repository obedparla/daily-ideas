import React, { useContext, useEffect, useState } from 'react';

import { withFirebase } from '../../Firebase';
import { UserList } from './components/UserList';

const AdmimPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const firebase = useContext(withFirebase);

  useEffect(() => {
    setLoading(true);

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      console.log("Aloha");
      setUsers(usersList);
      setLoading(false);
    }, (e) => console.error(e));

    return () => firebase.users().off();
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  );
};

export default AdmimPage;