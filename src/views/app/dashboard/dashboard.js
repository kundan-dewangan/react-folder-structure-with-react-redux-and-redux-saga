import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/actions";
import { useHistory } from 'react-router-dom';
import { Row, Col, Container, Button } from "reactstrap";

import DashboardComponent from '../../../components/dashboard/DashboardComponent'
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
                <DashboardComponent />
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