import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Country } from "@/type";
import 'bootstrap/dist/css/bootstrap.min.css';


const GET_COUNTRIES = gql`
  query Countries {
    countries {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);

  const { loading, error } = useQuery(GET_COUNTRIES, {
    onCompleted: (data) => {
      setCountries(data.countries);
    },
  });

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error...</span>;

  return (
    <Container fluid="md">
      <Row xs={1} md={2} lg={4} className="g-4">
        {countries.map((country) => (
          <Col key={country.id} className="mb-4">
            <Card as="a" href={`/country/${country.code}`}>
              <Card.Body>
                <Card.Title>{country.name}</Card.Title>
                <Card.Text>{country.emoji}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
