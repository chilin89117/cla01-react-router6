import {Link} from 'react-router-dom'
import {styled} from 'styled-components'

const StyledLink = styled(Link)`
  width: 90%;
  height: 90px;
  display: flex;
  background-color: wheat;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 8px;
  text-decoration: none;
  color: black;
  transition:
    transform 0.1s ease-in-out,
    background 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translate(0, -3px);
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.1);
  }
`

const Img = styled.img`
  width: 60px;
  height: 90px;
  margin-right: 16px;
`

const BookCard = ({book}) => {
  // <StyledLink goes to /books/:id or /admin/:id (to edit) in Admin mode
  return (
    <StyledLink to={`${book.id}`}>
      <Img
        src={book.image}
        alt={book.title}
      />
      <div>
        <h3>{book.title}</h3>
        <p>${book.price}</p>
      </div>
    </StyledLink>
  )
}

export default BookCard
