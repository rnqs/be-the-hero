import React from "react";
import { StatusBar } from "react-native";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </>
  );
}
