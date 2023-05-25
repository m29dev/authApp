import Header from "./components/Header"
import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header></Header>
      <ToastContainer></ToastContainer>
      <Container className='my-2'>
        <Outlet></Outlet>
      </Container>
    </>
  )
}

export default App