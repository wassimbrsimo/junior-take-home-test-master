import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from "graphql";
import { nodeDefinitions } from "graphql-relay";

import { ClinicalTrialType } from "./clinicalTrials";
import { queryBuilder } from "./database";

const { nodeField } = nodeDefinitions(() => {
  return null;
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      node: nodeField,
      clinicalTrials: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(ClinicalTrialType))),
        args: {
          patientsSortDirection: {
            type: GraphQLString,
          },
          countrySortDirection: {
            type: GraphQLString,
          },
          countryFilterString: {
            type: GraphQLString,
          },
        },
        resolve: (
          _,
          { patientsSortDirection, countrySortDirection, countryFilterString }
        ) => {
          let baseQuery = queryBuilder("clinical_trial");
          if (countryFilterString.length)
            baseQuery.where("country", "like", `${countryFilterString}%`);
          if (patientsSortDirection !== null) {
            baseQuery = baseQuery.orderBy("patients", patientsSortDirection);
          }
          if (countrySortDirection !== null) {
            baseQuery = baseQuery.orderBy("country", countrySortDirection);
          }
          return baseQuery.select();
        },
      },
    },
  }),
});
