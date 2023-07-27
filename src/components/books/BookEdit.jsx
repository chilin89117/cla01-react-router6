import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {styled} from 'styled-components'

const Form = styled.form`
  background-color: wheat;
  border-radius: 5px;
  padding: 16px;
`

const Input = styled.input`
  width: 90%;
  border-radius: 5px;
  border: 2px solid transparent;
  color: crimson;
  background-color: white;
  padding: 12px 16px;
  margin-bottom: 8px;
  outline: 0;
  font-size: 1rem;
  &:focus {
    border-color: #3b71ca;
  }
`

const TextArea = styled.textarea`
  width: 90%;
  border-radius: 5px;
  border: 2px solid transparent;
  color: crimson;
  background-color: white;
  padding: 12px 16px;
  margin-bottom: 8px;
  outline: 0;
  font-size: 1rem;
  min-height: 100px;
  resize: none;
  &:focus {
    border-color: #3b71ca;
  }
`

const Button = styled.button`
  margin-right: 2rem;
  border: 3px solid crimson;
  color: crimson;
  background: none;
  padding: 12px 16px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  &:disabled {
    cursor: default;
    opacity: 30%;
  }
`

const BookEdit = () => {
  const navigate = useNavigate()
  const params = useParams() // 'id' of book to edit in params from path in <Admin />
  const editMode = params?.id ? true : false

  useEffect(() => {
    const getBookToEdit = async () => {
      if (!editMode) return // No 'id' in params means form is for adding a new book
      try {
        const response = await axios.get(`/books/${params.id}`)
        setFormFields(response.data)
      } catch (error) {
        alert('Failed to retrieve book to edit!')
        navigate('/admin', {replace: true})
      }
    }

    getBookToEdit()
  }, [params])

  const [{title, price, description}, setFormFields] = useState({title: '', price: '', description: ''})

  const handleChange = ({name, value}) => {
    setFormFields(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let endpoint, id

      if (editMode) {
        endpoint = `/books/${params.id}`
        id = params.id
      } else {
        endpoint = '/books/new'
        id = String(Math.round(Math.random() * 1000000))
      }

      const response = await axios.post(endpoint, {
        book: {id, title, price, description}
      })

      alert(`Book successfully ${editMode ? 'updated' : 'added'}!`)

      navigate(`/books/${response.data.id}`)
    } catch (error) {
      alert('Failed to create new book!')
    }
  }

  const handleDelete = async () => {
    try {
      if (confirm('Are you sure?')) {
        await axios.delete(`/books/${params.id}`)
        alert('Book successfully deleted!')
        navigate('/admin')
      }
    } catch (error) {
      alert('Failed to delete book!')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        name='title'
        placeholder='title'
        value={title}
        onChange={({target}) => handleChange(target)}
      />
      <Input
        type='number'
        name='price'
        placeholder='price'
        value={price}
        onChange={({target}) => handleChange(target)}
      />
      <TextArea
        name='description'
        rows={15}
        placeholder='description'
        value={description}
        onChange={({target}) => handleChange(target)}
      />

      <Button
        type='submit'
        disabled={!title.trim() || isNaN(price) || price < 0 || !description.trim()}
      >
        {editMode ? 'Update' : 'Add'}
      </Button>

      {editMode && (
        <Button
          type='button'
          onClick={handleDelete}
        >
          delete
        </Button>
      )}
    </Form>
  )
}

export default BookEdit
