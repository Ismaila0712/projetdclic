import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => (
    <Container className="min-vh-70 d-flex align-items-center justify-content-center py-5">
        <RegisterForm />
    </Container>
);

export default RegisterPage;