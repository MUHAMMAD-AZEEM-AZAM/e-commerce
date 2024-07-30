import {React} from 'react'
import Nav from '../components/Nav'
import { Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const MainLayout = ({ cartLength }) => {
 
  return (
    <div>
      <Nav cartLength={cartLength} />
      <Outlet />
      <ToastContainer/>
    </div>
  )
}

export default MainLayout