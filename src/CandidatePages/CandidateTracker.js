import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../styles/CandidateTracker.css";

const CandidateTracker = () => {
  const handleAddCandidate = () => {
    window.open("/add-candidate", "_blank");
  };

  const handleViewRecords = () => {
    window.open("/view-records", "_blank");
  };

  return (
    <div className="candidate-tracker-container">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="candidate-card shadow-sm animate-fade-in">
            <Card.Body>
              <Card.Title className="card-title">
                Add Candidate Details
              </Card.Title>
              <Card.Text>You can add candidate details here.</Card.Text>
              <Button
                variant="primary"
                className="custom-btn"
                onClick={handleAddCandidate}
              >
                Add Candidate
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="candidate-card shadow-sm animate-fade-in">
            <Card.Body>
              <Card.Title className="card-title">
                Get Candidate Records
              </Card.Title>
              <Card.Text>
                You can view and manage candidate records here.
              </Card.Text>
              <Button
                variant="primary"
                className="custom-btn"
                onClick={handleViewRecords}
              >
                View Records
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CandidateTracker;
