import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '450px' }}>
            <Card.Body className="p-4">
                <h3 className="text-center fw-bold mb-4">Connexion</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <small className="text-muted">
                        Pas encore de compte ? <Link to="/register" className="text-primary">S'inscrire</Link>
                    </small>
                </div>
            </Card.Body>
        </Card>
    );
};

export default LoginForm;