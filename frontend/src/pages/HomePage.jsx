import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Spinner } from 'react-bootstrap';
import api from '../api/axiosConfig';
import ProductList from '../components/products/ProductList';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data.data || []);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {/* Hero */}
            <div className="bg-primary text-white py-5">
                <Container className="text-center py-4">
                    <h1 className="display-3 fw-bold">Les meilleurs gadgets  adaptés à votre style</h1>
                    <p className="lead">Explorez les derniers gadgets & accessoires.</p>
                    <Button as={Link} to="/products" variant="light" size="lg">
                        Découvrir
                    </Button>
                </Container>
            </div>

            {/* Avantages */}
            <Container className="py-5">
                <div className="row text-center g-4">
                    <div className="col-md-4">
                        <div className="display-1">🚚</div>
                        <h5 className="mt-2">Livraison gratuite</h5>
                        <p className="text-muted">Dès 50€ d'achat</p>
                    </div>
                    <div className="col-md-4">
                        <div className="display-1">🔄</div>
                        <h5 className="mt-2">Retour sous 30 jours</h5>
                        <p className="text-muted">Satisfait ou remboursé</p>
                    </div>
                    <div className="col-md-4">
                        <div className="display-1">📞</div>
                        <h5 className="mt-2">Support 24/7</h5>
                        <p className="text-muted">À votre écoute</p>
                    </div>
                </div>
            </Container>

            {/* Produits */}
            <Container className="pb-5">
                <h2 className="mb-4">⭐ Nos produits</h2>
                {loading ? (
                    <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
                ) : (
                    <ProductList products={products} />
                )}
            </Container>
        </div>
    );
};

export default HomePage;