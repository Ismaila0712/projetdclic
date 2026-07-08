import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Cart, Person, BoxArrowRight, PersonPlus } from 'react-bootstrap-icons';

const Header = () => {
    const { user, logout, isAdmin } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-3">
                    ShopEase
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/products">Produits</Nav.Link>
                        {user && <Nav.Link as={Link} to="/orders">Mes commandes</Nav.Link>}
                        {isAdmin() && <Nav.Link as={Link} to="/admin" className="text-warning fw-bold">Admin</Nav.Link>}
                    </Nav>
                    <div className="d-flex align-items-center gap-3">
                        <Link to="/cart" className="text-dark position-relative text-decoration-none">
                            <Cart size={24} />
                            {itemCount > 0 && (
                                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                                    {itemCount}
                                </Badge>
                            )}
                        </Link>
                        {user ? (
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-muted small">
                                    <Person size={16} className="me-1" />
                                    {user.name}
                                </span>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                                    <BoxArrowRight size={16} />
                                </Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button as={Link} to="/login" variant="outline-primary" size="sm">
                                    Connexion
                                </Button>
                                <Button as={Link} to="/register" variant="primary" size="sm">
                                    <PersonPlus size={16} className="me-1" />
                                    Inscription
                                </Button>
                            </div>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;