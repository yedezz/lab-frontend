import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "medico-cloud",
  clientId: "lab-frontend",
});

export default keycloak;
