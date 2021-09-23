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
const Button = styled.button`
  border-radius: 10px;
  background-color: #94e498;
  border-width: 0px;
  margin: 10px;
  padding: 15px;
`;
const Input = styled.input`
  padding: 16px 16px 16px 60px;
  font-weight: 300;
  font-size: 15px;
  border-radius: 10px;
  border-width: 0px;
  margin: 20px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: red;
  }
  :-ms-input-placeholder {
    color: red;
  }
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
  }, [
    patientsSortDirection,
    setPatientsSortDirection,
    setCountrySortDirection,
  ]);

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
  }, [countrySortDirection, setCountrySortDirection, setPatientsSortDirection]);

  const [inputText, setInputText] = useState<any>(countryFilterString);

  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCountryFilterString(inputText);
        }}
      >
        <label>
          Country:
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button type="submit">Filter</Button>
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
