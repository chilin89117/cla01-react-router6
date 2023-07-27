import {Outlet, Route, Routes} from 'react-router-dom'
import {styled} from 'styled-components'
import BooksList from './BooksList.jsx'
import BookItem from './BookItem.jsx'

const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Logo = styled.img`
  width: 200px;
  margin: 26px auto;
  border-radius: 5px;
`

const Books = () => {
  return (
    <BooksContainer>
      <Logo
        src='/assets/images/logo.svg'
        alt='logo'
      />

      {/* Place routes related to books domain here instead of in <App /> (Video 21) */}
      <Routes>
        <Route
          index
          element={<BooksList />}
        />
        <Route
          path=':id'
          element={<BookItem />}
        />
      </Routes>

      <Outlet />
    </BooksContainer>
  )
}

export default Books
