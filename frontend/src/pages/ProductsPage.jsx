import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import api from '../api/axiosConfig';
import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        category_id: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = { page };
                if (filters.q) params.q = filters.q;
                if (filters.category_id) params.category_id = filters.category_id;

                const response = await api.get('/products', { params });
                setProducts(response.data.data || []);
                setLastPage(response.data.last_page || 1);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [filters, page]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) setPage(newPage);
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Catalogue</h1>
            <Row className="mb-4">
                <Col md={8}>
                    <Form.Control
                        type="text"
                        name="q"
                        placeholder="Rechercher un produit..."
                        value={filters.q}
                        onChange={handleFilterChange}
                    />
                </Col>
                <Col md={4}>
                    <Form.Select
                        name="category_id"
                        value={filters.category_id}
                        onChange={handleFilterChange}
                    >
                        <option value="">Toutes les catégories</option>
                        <option value="1">Électronique</option>
                        <option value="2">Vêtements</option>
                        <option value="3">Maison</option>
                        <option value="4">Sports</option>
                        <option value="5">Livres</option>
                    </Form.Select>
                </Col>
            </Row>

            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
            ) : (
                <>
                    <ProductList products={products} />
                    {lastPage > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(page - 1)}>Précédent</button>
                                    </li>
                                    {[...Array(lastPage)].map((_, i) => (
                                        <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${page === lastPage ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>Suivant</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default ProductsPage;