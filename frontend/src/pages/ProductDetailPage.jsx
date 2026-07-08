import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner } from 'react-bootstrap';
import { ArrowLeft, CartPlus, StarFill, Star } from 'react-bootstrap-icons';
import api from '../api/axiosConfig';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, quantity);
            alert('Produit ajouté au panier !');
        } catch (error) {
            alert('Erreur lors de l\'ajout au panier.');
        }
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    if (!product) return <Container className="py-5"><p>Produit non trouvé.</p></Container>;

    return (
        <Container className="py-4">
            <Link to="/products" className="text-decoration-none"><ArrowLeft className="me-1" /> Retour au catalogue</Link>
            <Row className="mt-4 g-4">
                <Col md={6}>
                    <div className="bg-light rounded-3 overflow-hidden" style={{ height: '400px' }}>
                        <img
                            src={product.image_url || 'https://via.placeholder.com/600x400?text=Produit'}
                            alt={product.name}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                </Col>
                <Col md={6}>
                    <h1 className="display-6 fw-bold">{product.name}</h1>
                    <Badge bg="secondary" className="mb-3">{product.category?.name}</Badge>
                    <div className="d-flex gap-1 text-warning mb-3">
                        {[...Array(5)].map((_, i) => i < 4 ? <StarFill key={i} /> : <Star key={i} />)}
                        <span className="text-muted ms-2 small">(0 avis)</span>
                    </div>
                    <h2 className="text-primary display-6 fw-bold mb-3">{product.price} €</h2>
                    <p className="text-muted">{product.description}</p>
                    <div className="d-flex align-items-center gap-3 mt-4">
                        <div className="d-flex align-items-center border rounded-3">
                            <Button variant="link" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-dark text-decoration-none px-3 py-1">-</Button>
                            <span className="px-3">{quantity}</span>
                            <Button variant="link" onClick={() => setQuantity(quantity + 1)} className="text-dark text-decoration-none px-3 py-1">+</Button>
                        </div>
                        <Button variant="primary" size="lg" className="flex-grow-1" onClick={handleAddToCart}>
                            <CartPlus className="me-2" /> Ajouter au panier
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetailPage;