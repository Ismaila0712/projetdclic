import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import Loader from '../../components/common/Loader';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', image_url: '', category_id: '',
    });
    const isEdit = !!id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesRes = await api.get('/categories');
                setCategories(categoriesRes.data || []);
                if (isEdit) {
                    const productRes = await api.get(`/products/${id}`);
                    const product = productRes.data;
                    setFormData({
                        name: product.name || '',
                        description: product.description || '',
                        price: product.price_raw || product.price || '',
                        image_url: product.image_url || '',
                        category_id: product.category?.id || '',
                    });
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur chargement des données.');
            }
        };
        fetchData();
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await api.put(`/products/${id}`, formData);
            } else {
                await api.post('/products', formData);
            }
            navigate('/admin/products');
        } catch (error) {
            alert('Erreur lors de la sauvegarde.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) return <Loader />;

    return (
        <Container className="py-4">
            <h1 className="mb-4">{isEdit ? '✏️ Modifier' : '➕ Nouveau produit'}</h1>
            <Card className="shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-4">
                            <Col md={6}><Form.Group><Form.Label>Nom *</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>Catégorie *</Form.Label><Form.Select name="category_id" value={formData.category_id} onChange={handleChange} required><option value="">Choisir</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</Form.Select></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>Prix (€) *</Form.Label><Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" min="0" /></Form.Group></Col>
                            <Col md={6}><Form.Group><Form.Label>Image URL</Form.Label><Form.Control type="url" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." /></Form.Group></Col>
                            <Col xs={12}><Form.Group><Form.Label>Description *</Form.Label><Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required rows={4} /></Form.Group></Col>
                            <Col xs={12}>
                                <div className="d-flex gap-3">
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        {loading ? <Spinner size="sm" /> : null}
                                        {loading ? 'Sauvegarde...' : (isEdit ? 'Mettre à jour' : 'Créer')}
                                    </Button>
                                    <Button variant="secondary" onClick={() => navigate('/admin/products')}>Annuler</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminProductForm;