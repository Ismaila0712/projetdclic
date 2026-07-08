import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Form, Spinner, Alert } from 'react-bootstrap';
import api from '../../api/axiosConfig';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/admin/orders');
                // Assure que c'est un tableau
                setOrders(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error('Erreur chargement commandes:', err);
                setError(err.response?.data?.message || 'Impossible de charger les commandes.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (err) {
            alert('Erreur mise à jour du statut.');
        }
    };

    const getStatusBadge = (status) => {
        const labels = {
            pending: { text: 'En cours', color: 'warning' },
            completed: { text: 'Livrée', color: 'success' },
            cancelled: { text: 'Annulée', color: 'danger' },
        };
        return labels[status] || { text: status, color: 'secondary' };
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>;

    if (error) return (
        <Container className="py-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    if (orders.length === 0) {
        return (
            <Container className="py-4 text-center">
                <p>Aucune commande trouvée.</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">📋 Gestion des commandes</h1>
            <Card className="shadow-sm">
                <Card.Body className="p-0">
                    <Table responsive className="mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Utilisateur</th>
                                <th>Total</th>
                                <th>Statut</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => {
                                const status = getStatusBadge(order.status);
                                return (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.user?.name || 'Utilisateur'}</td>
                                        <td className="fw-bold text-primary">{order.total_price} €</td>
                                        <td><Badge bg={status.color}>{status.text}</Badge></td>
                                        <td>{order.created_at}</td>
                                        <td>
                                            <Form.Select
                                                size="sm"
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                style={{ width: '140px' }}
                                            >
                                                <option value="pending">En cours</option>
                                                <option value="completed">Livrée</option>
                                                <option value="cancelled">Annulée</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminOrders;