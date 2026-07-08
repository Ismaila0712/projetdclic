import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { useCart } from '../contexts/CartContext';
import api from '../api/axiosConfig';

const CartPage = () => {
    const { cartItems, total, loading, updateQuantity, removeItem, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        try {
            await api.post('/orders');
            await clearCart();
            navigate('/orders');
        } catch (error) {
            alert('Erreur lors de la commande.');
        }
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    if (!cartItems || cartItems.length === 0) {
        return (
            <Container className="py-5 text-center">
                <div className="display-1 mb-3">🛒</div>
                <h2>Votre panier est vide</h2>
                <p className="text-muted">Découvrez nos produits et remplissez votre panier !</p>
                <Button as={Link} to="/products" variant="primary">Voir les produits</Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">🛒 Mon panier ({cartItems.length} articles)</h1>
            <Row className="g-4">
                <Col lg={8}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-0">
                            <Table responsive className="mb-0">
                                <thead>
                                    <tr><th>Produit</th><th>Prix</th><th>Quantité</th><th>Total</th><th></th></tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => {
                                        const product = item.product;
                                        const subtotal = product.price_raw * item.quantity;
                                        return (
                                            <tr key={product.id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <img
                                                            src={product.image_url || 'https://via.placeholder.com/60x60?text=Produit'}
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                            className="rounded"
                                                        />
                                                        <span className="fw-semibold">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td>{product.price} €</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(product.id, item.quantity - 1)}>-</Button>
                                                        <span className="mx-3">{item.quantity}</span>
                                                        <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(product.id, item.quantity + 1)}>+</Button>
                                                    </div>
                                                </td>
                                                <td>{subtotal.toFixed(2)} €</td>
                                                <td><Button variant="danger" size="sm" onClick={() => removeItem(product.id)}><Trash /></Button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Résumé</h5>
                            <hr />
                            <div className="d-flex justify-content-between"><span>Sous-total</span><span>{total} €</span></div>
                            <div className="d-flex justify-content-between text-success"><span>Livraison</span><span>Gratuite</span></div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span>{total} €</span></div>
                            <Button variant="primary" className="w-100 mt-3" onClick={handlePlaceOrder}>Passer la commande</Button>
                            <Button as={Link} to="/products" variant="link" className="w-100 mt-2">Continuer mes achats</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;