import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await register(
            formData.name,
            formData.email,
            formData.password,
            formData.password_confirmation
        );
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
            <Card.Body className="p-4">
                <h3 className="text-center fw-bold mb-4">Inscription</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom complet</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jean Dupont"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min 8 caractères"
                            required
                            minLength={8}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirmer</Form.Label>
                        <Form.Control
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                        {loading ? 'Inscription...' : "S'inscrire"}
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <small className="text-muted">
                        Déjà un compte ? <Link to="/login" className="text-primary">Se connecter</Link>
                    </small>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RegisterForm;