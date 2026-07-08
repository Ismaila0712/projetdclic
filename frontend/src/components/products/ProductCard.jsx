import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { CartPlus } from 'react-bootstrap-icons';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            await addToCart(product.id, 1);
        } catch (error) {
            alert('Erreur lors de l\'ajout au panier');
        }
    };

    return (
        <Card className="h-100 shadow-sm hover-shadow">
            <Link to={`/products/${product.id}`} className="text-decoration-none">
                <Card.Img
                    variant="top"
                    src={product.image_url || 'https://via.placeholder.com/300x200?text=Produit'}
                    className="card-img-top"
                />
            </Link>
            <Card.Body>
                <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
                    <Card.Title className="fs-6 fw-semibold text-truncate">{product.name}</Card.Title>
                </Link>
                <Card.Text className="text-muted small">{product.category?.name || 'Sans catégorie'}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary fs-5">{product.price} €</span>
                    <Button variant="primary" size="sm" onClick={handleAddToCart}>
                        <CartPlus size={18} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;