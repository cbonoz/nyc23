
import { useQuery, gql } from "@apollo/client";

// grahql
// https://docs.next.id/core-concepts/relation-service/rs-example
export const EXAMPLE_ID_QUERY = gql`query findOneIdentityWithSource {
    identity(platform: "twitter", identity: "suji_yan") {
      uuid
      platform
      identity
      displayName
      createdAt
      addedAt
      updatedAt
      # Here we perform a 3-depth deep search for this identity's "neighbor".
      neighbor(depth: 5) {
        sources # Which upstreams provide these connection infos.
        identity {
          uuid
          platform
          identity
          displayName
        }
      }
    }
  }
  
  `

