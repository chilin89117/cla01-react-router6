import {useEffect, useState} from 'react'
import {useLocation, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import {styled} from 'styled-components'
import BookCard from './BookCard.jsx'

const RadioContaier = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`

const StyledP = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: crimson;
`

const List = styled.div`
  margin-top: 10px;
`

const BooksList = () => {
  const [books, setBooks] = useState(null)
  const {state} = useLocation() // State of location set by error in <BookItem />
  const [searchParams, setSearchParams] = useSearchParams()

  // Sort books from useEffect() based on search params (if any) and set state variable 'books'
  const sortAndSetBooks = (data, searchParamsObj) => {
    // Default sort order is by title ascending (see 'defaultChecked' properties for <input /> below)
    if (Object.keys(searchParamsObj).length === 0) {
      searchParamsObj = {sortby: 'title', order: 'asc'}
    }

    const sortedBooks = data.sort((a, b) => {
      const {sortby, order} = searchParamsObj
      // e.g. a['price'] > b['price']
      if (order === 'asc') return a[sortby] > b[sortby] ? 1 : -1
      else if (order === 'desc') return a[sortby] < b[sortby] ? 1 : -1
      else return null // No sorting
    })

    setBooks(() => sortedBooks)
  }

  // See useLocation() above
  useEffect(() => {
    if (state) console.warn(`No book found for ${state.id}`)
  }, [])

  useEffect(() => {
    const getBooks = async () => {
      const response = await axios.get('/books')
      const searchParamsObj = Object.fromEntries([...searchParams])
      sortAndSetBooks(response.data, searchParamsObj)
    }

    getBooks()
  }, [])

  const handleUpdateSearchParams = e => {
    // 'name' is 'sortby' or 'order'; 'value' is 'title' or 'price' for 'sortby', and 'asc' or 'desc' for 'order'
    const {name, value} = e.target
    const currentParams = Object.fromEntries([...searchParams]) // e.g. {sortby: 'title', order: 'asc'}

    // Make sure 'sortby' and 'order' both appear in 'newParams; if not, set defaults to 'title' and 'asc'
    if (name === 'sortby' && !currentParams.order) currentParams.order = 'asc'
    if (name === 'order' && !currentParams.sortby) currentParams.sortby = 'title'

    const newParams = {...currentParams, [name]: value}
    setSearchParams(() => ({...newParams}))
    sortAndSetBooks(books, newParams)
  }

  if (!books) return <h3>Loading...</h3>
  if (books?.length === 0) return <h3>No books to show.</h3>

  return (
    <>
      <RadioContaier>
        <StyledP>Sort by:</StyledP>
        <label>
          Title
          {/* Default sort field is 'title' if no 'searchParams' exists */}
          <input
            type='radio'
            name='sortby'
            value='title'
            defaultChecked={searchParams.get('sortby') ? searchParams.get('sortby') === 'title' : true}
            onChange={handleUpdateSearchParams}
          />
        </label>
        <label>
          Price
          {/* Default sort field is 'title' if no 'searchParams' exists */}
          <input
            type='radio'
            name='sortby'
            value='price'
            defaultChecked={searchParams.get('sortby') ? searchParams.get('sortby') === 'price' : false}
            onChange={handleUpdateSearchParams}
          />
        </label>
      </RadioContaier>

      <RadioContaier>
        <StyledP>Sort order:</StyledP>
        <label>
          Ascending
          {/* Default sort order is 'asc' if no 'searchParams' exists */}
          <input
            type='radio'
            name='order'
            value='asc'
            defaultChecked={searchParams.get('order') ? searchParams.get('order') === 'asc' : true}
            onChange={handleUpdateSearchParams}
          />
        </label>
        <label>
          Descending
          {/* Default sort order is 'asc' if no 'searchParams' exists */}
          <input
            type='radio'
            name='order'
            value='desc'
            defaultChecked={searchParams.get('order') ? searchParams.get('order') === 'desc' : false}
            onChange={handleUpdateSearchParams}
          />
        </label>
      </RadioContaier>

      <List>
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </List>
    </>
  )
}

export default BooksList
