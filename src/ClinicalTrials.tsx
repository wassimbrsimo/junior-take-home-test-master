import styled from "styled-components";
import React, { Fragment, useCallback, useState } from "react";

import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import {
  PatientsSortDirection,
  CountrySortDirection,
  CountryFilterString,
} from "./App";

const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

const Header = styled.div`
  display: table-header-group;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Row = styled.div`
  display: table-row;
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

const ClickableHeaderCell = styled(HeaderCell)`
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);

  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;

interface Props {
  clinicalTrials: AppQueryResponse["clinicalTrials"];
  patientsSortDirection: PatientsSortDirection;
  setPatientsSortDirection: (
    patientsSortDirection: PatientsSortDirection
  ) => void;
  countrySortDirection: CountrySortDirection;
  setCountrySortDirection: (countrySortDirection: CountrySortDirection) => void;
  countryFilterString: CountryFilterString;
  setCountryFilterString: (countryFilterString: CountryFilterString) => void;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  countrySortDirection,
  setCountrySortDirection,
  countryFilterString,
  setCountryFilterString,
}: Props) => {
  const togglePatientsSortDirection = useCallback(() => {
    if (patientsSortDirection == null) {
      setPatientsSortDirection("asc");
      setCountrySortDirection(null);
    } else if (patientsSortDirection === "asc") {
      setPatientsSortDirection("desc");
      setCountrySortDirection(null);
    } else {
      setPatientsSortDirection(null);
    }
  }, [patientsSortDirection, setPatientsSortDirection]);

  const toggleCountrySortDirection = useCallback(() => {
    if (countrySortDirection == null) {
      setCountrySortDirection("asc");
      setPatientsSortDirection(null);
    } else if (countrySortDirection === "asc") {
      setCountrySortDirection("desc");
      setPatientsSortDirection(null);
    } else {
      setCountrySortDirection(null);
    }
  }, [countrySortDirection, setCountrySortDirection]);

  const [inputText, setInputText] = useState<String>("");

  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit ");
        }}
      >
        <label>
          Filter Country:
          <input
            type="text"
            value={countryFilterString}
            onSubmit={(e) => console.log("submit ", e)}
            onChange={(e) => setCountryFilterString(e.target.value)}
          />
        </label>
      </form>
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <ClickableHeaderCell onClick={toggleCountrySortDirection}>
            country{sortDirectionIndicator(countrySortDirection)}
          </ClickableHeaderCell>
          <ClickableHeaderCell onClick={togglePatientsSortDirection}>
            patients{sortDirectionIndicator(patientsSortDirection)}
          </ClickableHeaderCell>
          <HeaderCell>city</HeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map((clinicalTrial) => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
              <Cell>{clinicalTrial.city}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

const sortDirectionIndicator = (
  patientsSortDirection: PatientsSortDirection
) => {
  if (patientsSortDirection === "asc") return "↑";
  if (patientsSortDirection === "desc") return "↓";
  return "";
};

export default ClinicalTrials;
