import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">Aucun produit trouvé.</p>
            </div>
        );
    }

    return (
        <Row className="g-4">
            {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;