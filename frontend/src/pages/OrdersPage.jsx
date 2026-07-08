import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../contexts/AuthContext';

const OrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get('/orders');
                setOrders(response.data || []);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    const getStatusBadge = (status) => {
        const labels = {
            pending: { text: 'En cours', color: 'warning' },
            completed: { text: 'Livrée', color: 'success' },
            cancelled: { text: 'Annulée', color: 'danger' },
        };
        return labels[status] || { text: status, color: 'secondary' };
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;
    if (!user) return <Container className="py-5 text-center"><p>Veuillez vous connecter.</p></Container>;

    if (orders.length === 0) {
        return (
            <Container className="py-5 text-center">
                <div className="display-1 mb-3">📦</div>
                <h2>Aucune commande</h2>
                <p className="text-muted">Vous n'avez pas encore passé de commande.</p>
                <Button as={Link} to="/products" variant="primary">Découvrir les produits</Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">📋 Mes commandes</h1>
            <Row className="g-4">
                {orders.map((order) => {
                    const status = getStatusBadge(order.status);
                    return (
                        <Col key={order.id} xs={12}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                                        <div>
                                            <h5>Commande #{order.id}</h5>
                                            <small className="text-muted">{order.created_at}</small>
                                        </div>
                                        <div className="d-flex gap-3 align-items-center">
                                            <Badge bg={status.color}>{status.text}</Badge>
                                            <span className="fw-bold fs-5 text-primary">{order.total_price} €</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <h6 className="mb-2">Produits</h6>
                                    {order.products && order.products.length > 0 ? (
                                        order.products.map((product) => (
                                            <div key={product.id} className="d-flex justify-content-between small py-1 border-bottom">
                                                <span>{product.name} <span className="text-muted ms-2">x {product.pivot?.quantity || 0}</span></span>
                                                <span>{product.pivot?.price || 0} €</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted small">Aucun produit détaillé.</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default OrdersPage;