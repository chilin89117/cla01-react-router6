import {NavLink} from 'react-router-dom'
import {styled} from 'styled-components'

const Nav = styled.nav`
  margin-bottom: 16px;
  a {
    padding: 8px 14px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 5px;
    &.active {
      color: #3b71ca;
      border: 3px solid #3b71ca;
    }
  }
`

const Navbar = () => (
  <Nav>
    {/* .active class applies only to exact match to '/books' or '/admin' */}
    <NavLink
      to={'/books'}
      end
    >
      Books
    </NavLink>
    <NavLink
      to={'/admin'}
      end
    >
      Admin
    </NavLink>
  </Nav>
)

export default Navbar
