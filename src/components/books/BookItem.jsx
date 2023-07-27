import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {styled} from 'styled-components'

const Container = styled.div`
  background-color: wheat;
  border-radius: 5px;
  padding: 16px;
  width: 90%;
`

const Header = styled.div`
  display: flex;
`

const Img = styled.img`
  width: 60px;
  margin-right: 16px;
`

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.3rem;
  margin: 0;
`

const Price = styled.p`
  color: #a12b27;
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
`

const Button = styled.button`
  border: 3px solid #a12b27;
  color: #a12b27;
  background: none;
  padding: 12px 14px;
  margin-right: 6px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
`

const BookItem = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [book, setBook] = useState(null)

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(`/books/${id}`)
        setBook(response.data)
      } catch (error) {
        navigate('/books', {state: {id}}) // Pass data to <BooksList /> to indicate an error
      }
    }

    getBook()
  }, [id])

  return (
    <Container>
      <Header>
        <Img
          src={book?.image}
          alt={book?.title}
        />
        <div>
          <Title>{book?.title}</Title>
          <Price>${book?.price}</Price>
        </div>
      </Header>

      <p>{book?.description}</p>

      <Button onClick={() => navigate(-1)}>Back</Button>
    </Container>
  )
}

export default BookItem
