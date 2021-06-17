import React from 'react'
import { Button, Row, Col, Card, Label, Container } from "reactstrap";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";
import Spinner from 'react-bootstrap/Spinner'
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions";

import { useHistory } from 'react-router-dom';

function Login({ loginUser, loading }) {

    const history = useHistory();

    const handleValidSubmit = (event, values) => {
        console.log(`vailid form`,event)
        loginUser(values, history)
    };

    const handleInvalidSubmit = (event, errors, values) => {
       console.log(`invailid form`,event,errors,values)
    };

    return (

        <>
            <Container>

                <Row style={{ marginTop: '20vmin' }}>
                    <Col sm="12" md={{ size: 4, offset: 4 }}>

                        <Card className="shadow p-4">

                            <h1 className="text-center mb-4">Login</h1>
                            <AvForm
                                onValidSubmit={handleValidSubmit}
                                onInvalidSubmit={handleInvalidSubmit}
                            >
                                <AvGroup className="error-t-negative">
                                    <Label>Email</Label>
                                    <AvField
                                        name="email"
                                        type="text"
                                        validate={{
                                            required: true,
                                            email: true
                                        }}
                                    />
                                </AvGroup>
                                <AvGroup className="error-t-negative">
                                    <Label>Password</Label>
                                    <AvField
                                        name="password"
                                        type="password"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Please enter your password"
                                            },
                                            pattern: {
                                                value: "^[A-Za-z0-9]+$",
                                                errorMessage:
                                                    "Your password must be composed only with letter and numbers"
                                            },
                                            minLength: {
                                                value: 6,
                                                errorMessage: "Your password must be between 6 and 16 characters"
                                            },
                                            maxLength: {
                                                value: 16,
                                                errorMessage: "Your password must be between 6 and 16 characters"
                                            }
                                        }}
                                    />
                                </AvGroup>
                                <Button id="submit" className="mt-4 text-center" >
                                    {loading && <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />}
                                    Submit</Button>
                            </AvForm>
                        </Card>
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
    loginUser: (info, history) => dispatch(loginUser(info, history)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
