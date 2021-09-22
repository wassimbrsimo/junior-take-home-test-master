import React, { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import styled from "styled-components";
import { QueryRenderer } from "react-relay";

import ClinicalTrials from "./ClinicalTrials";
import environment from "./environment";
import { AppQuery } from "./__generated__/AppQuery.graphql";

const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

export type PatientsSortDirection = "asc" | "desc" | null;
export type CountrySortDirection = "asc" | "desc" | null;
export type CountryFilterString = string;

const App: React.FC = () => {
  const [patientsSortDirection, setPatientsSortDirection] = useState<
    PatientsSortDirection
  >(null);
  const [countrySortDirection, setCountrySortDirection] = useState<
    CountrySortDirection
  >(null);
  const [countryFilterString, setCountryFilterString] = useState<
    CountryFilterString
  >("");
  return (
    <Layout>
      <Content>
        <QueryRenderer<AppQuery>
          environment={environment}
          query={graphql`
            query AppQuery(
              $patientsSortDirection: String
              $countrySortDirection: String
              $countryFilterString: String
            ) {
              clinicalTrials(
                patientsSortDirection: $patientsSortDirection
                countrySortDirection: $countrySortDirection
                countryFilterString: $countryFilterString
              ) {
                country
                patients
                site
                city
              }
            }
          `}
          variables={{
            patientsSortDirection,
            countrySortDirection,
            countryFilterString,
          }}
          render={({ props }) => {
            if (!props) {
              return;
            }
            return (
              <ClinicalTrials
                patientsSortDirection={patientsSortDirection}
                setPatientsSortDirection={setPatientsSortDirection}
                countrySortDirection={countrySortDirection}
                setCountrySortDirection={setCountrySortDirection}
                countryFilterString={countryFilterString}
                setCountryFilterString={setCountryFilterString}
                clinicalTrials={props.clinicalTrials}
              />
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default App;
