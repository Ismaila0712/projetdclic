import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => (
    <Container className="min-vh-70 d-flex align-items-center justify-content-center py-5">
        <LoginForm />
    </Container>
);

export default LoginPage;