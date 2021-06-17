import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions";
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, Container, Button } from "reactstrap";
function Dashboard({
    logoutUser
}) {

    const history = useHistory();

    return (
        <>
            <Container>
                <Row style={{ marginTop: '5vmin' }}>
                    <Col>
                        <h1 className="display-3 text-center">Welcome in Dashboard Page</h1>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10vmin' }}>
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
                </Row>
                <Row style={{ marginTop: '10vmin' }}>
                    <Col lg="12" className="text-center">
                        <Button type="button" className="btn btn-dark shadown text-center w-25" onClick={() => logoutUser(history)}>Logout</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
const mapStateToProps = ({ authUser }) => {
    const { user, loading, error, companyBasicInfo } = authUser;
    return { user, loading, error, companyBasicInfo };
};

const mapDispatchToProps = (dispatch) => ({
    logoutUser: (history) => dispatch(logoutUser(history)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);