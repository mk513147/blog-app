import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice' 
import { Header, Footer } from './components/inde'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[]);

  return !loading ? (<div className='bg-red-400 min-h-screen flex-wrap content-between'>
    <div className='w-full block text-center'>
      <Header />
      <main>
        {/* <Outlet /> */}
      </main>
      <Footer />
    </div>
  </div>
  ): null
}

export default App
