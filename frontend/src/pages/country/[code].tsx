import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Country } from "@/type";

const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
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

export default function CountryDetails() {
  const [country, setCountry] = useState<Country | null>(null);
  const router = useRouter();
  const code = router.query.code;

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
    onCompleted: (data) => {
      setCountry(data.country);
    },
  });

  if (loading) return <p>Loading...</p>;
  
  if (!country) {
    return <p>Erreur l'ami /!\</p>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>{country.code}</p>
      <p>{country.emoji}</p>
      <p>{country.continent.name}</p>
    </div>
  );
};

