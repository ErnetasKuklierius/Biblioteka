import { Link } from "react-router-dom"

export const Navbar = () => {

return (
    <nav>
        <Link to="/">Books</Link>
        <Link to="/authors">Authors</Link>
    </nav>
)
}