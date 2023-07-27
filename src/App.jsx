import {useState} from 'react'
import {BrowserRouter, Navigate, useRoutes} from 'react-router-dom'
import {styled} from 'styled-components'
import Books from './components/books/Books.jsx'
import Admin from './components/admin/Admin.jsx'
// import Protect from './components/common/Protect.jsx'
import Navbar from './components/common/Navbar.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'

const AppContainer = styled.div`
  margin: 60px auto;
  width: 400px;
`

const Content = styled.div`
  padding: 28px;
  background-color: white;
  border-radius: 5px;
`

const App = () => {
  const [authenticatd] = useState(true)

  // 'routes' is equivalent to <Routes /> (Video 34)
  const routes = useRoutes([
    {path: '/books/*', element: <Books />},
    {path: '/admin/*', element: authenticatd ? <Admin /> : <Navigate to='/books' />},
    {path: '*', element: <Navigate to='/books' />}
  ])

  return routes

  // Above code replaces this block:
  // <Routes>
  //   <Route
  //     path='/books/*'
  //     element={<Books />}
  //   />
  //   {/* Routes related to books domain are moved to <Books /> (Video 21) */}
  //   <Route
  //     path='/admin/*'
  //     element={
  //       <Protect
  //         authenticated={authenticatd}
  //         to='/books'
  //         element={<Admin />}
  //       />
  //     }
  //   />
  //   {/* <Route path='*' element={<NotFound />} /> */}
  //   <Route
  //     path='*'
  //     element={<Navigate to='/books' />}
  //   />
  // </Routes>
}

const AppWrapper = () => (
  <AppContainer>
    <BrowserRouter>
      <ScrollToTop />
      <Content>
        <Navbar />
        <App />
      </Content>
    </BrowserRouter>
  </AppContainer>
)

export default AppWrapper
