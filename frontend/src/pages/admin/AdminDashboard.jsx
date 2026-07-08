import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import api from '../../api/axiosConfig';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log('🔍 Récupération des statistiques...');

                // Récupérer les produits
                const productsRes = await api.get('/products');
                console.log('📦 Réponse produits brute:', productsRes.data);

                // ✅ CORRECTION : utiliser directement productsRes.data.total
                let totalProducts = 0;
                if (productsRes.data?.total) {
                    totalProducts = productsRes.data.total; // ← ICI la correction !
                } else if (productsRes.data?.meta?.total) {
                    totalProducts = productsRes.data.meta.total;
                } else if (Array.isArray(productsRes.data)) {
                    totalProducts = productsRes.data.length;
                } else if (Array.isArray(productsRes.data?.data)) {
                    totalProducts = productsRes.data.data.length;
                }

                console.log('📊 Total produits extrait:', totalProducts);

                // Récupérer les commandes
                let ordersCount = 0;
                try {
                    const ordersRes = await api.get('/admin/orders');
                    console.log('📋 Réponse commandes brute:', ordersRes.data);
                    if (Array.isArray(ordersRes.data)) {
                        ordersCount = ordersRes.data.length;
                    } else if (Array.isArray(ordersRes.data?.data)) {
                        ordersCount = ordersRes.data.data.length;
                    }
                } catch (e) {
                    console.warn('⚠️ Impossible de récupérer les commandes:', e);
                }

                setStats({
                    products: totalProducts,
                    orders: ordersCount,
                    users: 2,
                });
            } catch (err) {
                console.error('❌ Erreur chargement stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;

    return (
        <Container className="py-4">
            <h1 className="mb-4">🛠️ Tableau de bord Administrateur</h1>
            <Row className="g-4 mb-4">
                <Col md={4}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <h2 className="display-4 text-primary">{stats.products}</h2>
                            <p className="text-muted">Produits</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <h2 className="display-4 text-success">{stats.orders}</h2>
                            <p className="text-muted">Commandes</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <h2 className="display-4 text-warning">{stats.users}</h2>
                            <p className="text-muted">Utilisateurs</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="g-4">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <div className="display-1 mb-2">📦</div>
                            <h5>Gérer les produits</h5>
                            <p className="text-muted small">Ajouter, modifier, supprimer</p>
                            <Link to="/admin/products" className="btn btn-primary">Accéder</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <div className="display-1 mb-2">📋</div>
                            <h5>Gérer les commandes</h5>
                            <p className="text-muted small">Voir et modifier les statuts</p>
                            <Link to="/admin/orders" className="btn btn-primary">Accéder</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;