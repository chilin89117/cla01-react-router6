import {Navigate, Route, Routes} from 'react-router-dom'

const Protect = ({authenticated, to, element}) => {
  if (!authenticated) return <Navigate to='/books' />

  return (
    <Routes>
      {/* Must include '*' from child routes */}
      <Route
        path='/*'
        to={to}
        element={element}
      />
    </Routes>
  )
}

export default Protect
