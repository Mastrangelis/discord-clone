import React, { useEffect } from 'react';
import './styles/App.css';

// Components
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Login from './Components/Login';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';

// Auth with firebase
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">
      { user ? (
        <>  
          <Sidebar />
          <Chat />
        </>
        ) : <Login />
      }
    </div>
  );
}

export default App;
