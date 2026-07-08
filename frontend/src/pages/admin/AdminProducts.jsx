import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';
import { Plus, Pencil, Trash } from 'react-bootstrap-icons';
import api from '../../api/axiosConfig';
import Loader from '../../components/common/Loader';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/products').then(res => {
            setProducts(res.data.data || []);
        }).finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Confirmer la suppression ?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            alert('Erreur lors de la suppression.');
        }
    };

    if (loading) return <Loader />;

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>📦 Gestion des produits</h1>
                <Button as={Link} to="/admin/products/create" variant="primary"><Plus className="me-1" /> Nouveau produit</Button>
            </div>
            <Card className="shadow-sm">
                <Card.Body className="p-0">
                    <Table responsive className="mb-0">
                        <thead>
                            <tr><th>#</th><th>Nom</th><th>Prix</th><th>Catégorie</th><th className="text-end">Actions</th></tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.price} €</td>
                                    <td><Badge bg="secondary">{p.category?.name || '-'}</Badge></td>
                                    <td className="text-end">
                                        <Link to={`/admin/products/edit/${p.id}`} className="btn btn-sm btn-outline-primary me-1"><Pencil /></Link>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.id)}><Trash /></Button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && <tr><td colSpan="5" className="text-center py-4 text-muted">Aucun produit.</td></tr>}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminProducts;