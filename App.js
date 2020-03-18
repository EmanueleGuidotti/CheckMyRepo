import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/home';
import SetUpScreen from './screens/setUp';
import HeaderTitle from './components/headerTitle';
import ConfirmScreen from "./screens/confirm";

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            options={{
              headerTitle: props => (
                <HeaderTitle
                  {...props}
                  pageName={'Set the repository address'}
                />
              ),
              headerBackTitleVisible: false,
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="SetUp"
            options={{
              headerTitle: props => (
                <HeaderTitle {...props} pageName={'insert data'} />
              ),
              headerBackTitleVisible: false,
            }}
            component={SetUpScreen}
          />
          <Stack.Screen name="Confirm" component={ConfirmScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  pageHeader: {
    backgroundColor: 'transparent',
  },
});

const screenOptions = {
  title: null,
  headerStyle: styles.pageHeader,
  headerTintColor: 'black',
};

export default App;
