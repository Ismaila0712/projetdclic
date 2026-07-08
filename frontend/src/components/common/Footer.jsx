import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Envelope } from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 py-4">
            <Container>
                <Row className="g-4">
                    <Col md={3}>
                        <h5 className="fw-bold text-primary">ShopEase</h5>
                        <p className="text-white-50 small">
                            Votre plateforme de commerce en ligne simplifiée.
                        </p>
                    </Col>
                    <Col md={3}>
                        <h6 className="fw-bold">Liens rapides</h6>
                        <ul className="list-unstyled small">
                            <li><Link to="/products" className="text-white-50 text-decoration-none">Produits</Link></li>
                            <li><Link to="/cart" className="text-white-50 text-decoration-none">Panier</Link></li>
                            <li><Link to="/orders" className="text-white-50 text-decoration-none">Commandes</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 className="fw-bold">Informations</h6>
                        <ul className="list-unstyled small">
                            <li><a href="#" className="text-white-50 text-decoration-none">À propos</a></li>
                            <li><a href="#" className="text-white-50 text-decoration-none">Contact</a></li>
                            <li><a href="#" className="text-white-50 text-decoration-none">Conditions</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 className="fw-bold">Newsletter</h6>
                        <div className="input-group input-group-sm">
                            <input type="email" className="form-control" placeholder="Votre email" />
                            <button className="btn btn-primary">
                                <Envelope size={16} />
                            </button>
                        </div>
                    </Col>
                </Row>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between align-items-center small text-white-50">
                    <span>© 2026 ShopEase. Tous droits réservés.</span>
                    <div className="d-flex gap-3">
                        <a href="#" className="text-white-50"><Facebook size={18} /></a>
                        <a href="#" className="text-white-50"><Twitter size={18} /></a>
                        <a href="#" className="text-white-50"><Instagram size={18} /></a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;