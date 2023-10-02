import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MenuForm from './components/MenuForm'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import MyApp from './components/MyApp'
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
  return (
    <>
    <ToastContainer />
      {/* <Header/> */}
      <MyApp/>
      <SignUpForm/>
      <div>App</div>
      <LoginForm/>
      <MenuForm/>
      <Footer/>
    </>
  )
}