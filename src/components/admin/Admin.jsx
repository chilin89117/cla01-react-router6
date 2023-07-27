import {Link, Outlet, Route, Routes} from 'react-router-dom'
import {styled} from 'styled-components'
import BooksList from '../books/BooksList.jsx'
import BookEdit from '../books/BookEdit.jsx'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 3px solid crimson;
  border-radius: 5px;
  padding: 6px 12px;
  margin-left: auto;
  font-weight: 700;
  text-transform: uppercase;
  color: crimson;
`

const Admin = () => {
  return (
    <>
      <Container>
        <h2>Admin</h2>
        <StyledLink to='new'>New</StyledLink>
      </Container>

      {/* Place routes related to books domain here instead of in <App /> (Video 21) */}
      <Routes>
        <Route
          index
          element={<BooksList />}
        />
        <Route
          path='new'
          element={<BookEdit />}
        />
        <Route
          path=':id'
          element={<BookEdit />}
        />
      </Routes>

      <Outlet />
    </>
  )
}

export default Admin
