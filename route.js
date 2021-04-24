import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ComponentList from "./pages/componentList";
import Form from "./pages/form";

  //use stacknavigator to handle page pushing and popping
  const { Navigator, Screen } = createStackNavigator();

  //navigator that stores every page in this application
  const HomeNavigator = () => (
    <Navigator headerMode="none">
      <Screen name="ComponentListPage" component={ComponentList} />
      <Screen name="FormPage" component={Form} />
    </Navigator>
  );
  
  // export route with created navigator to be used in app.js
  export const Route = () => (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
