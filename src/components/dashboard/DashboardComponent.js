import React from 'react';
import { Row, Col, Card, Container, Button } from "reactstrap";
export default function DashboardComponent() {
    return (<Row style={{ marginTop: '10vmin' }}>
        {[1, 2, 3, 4].map((item, index) => {
            return (
                <Col sm="3" md={{ size: 3 }} key={index}>
                    <Card className={(() => {
                        switch (item) {
                            case 1: return 'shadow text-center bg-primary'
                            case 2: return 'shadow text-center bg-secondary'
                            case 3: return 'shadow text-center bg-info'
                            case 4: return 'shadow text-center bg-warning'
                            default: return 'shadow text-center bg-dark'
                        }
                    })()}
                    >
                        <h1>{item}</h1>
                    </Card>
                </Col>
            )
        }
        )}
    </Row>)
}
