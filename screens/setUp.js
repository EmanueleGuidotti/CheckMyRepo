import React, {useState, useLayoutEffect, useRef} from 'react';
import {
  StyleSheet,
} from 'react-native';
import TextInput from '../components/textInput';
import useGlobalState from '../context/context';
import {Button, Text, View} from 'native-base';
import ViewScrollWrapper from '../components/viewScrollWrapper';
import {mediumBox} from "../styles/view";

function SetUpScreen({navigation, route}) {
  const {state, setUsername, setRepo} = useGlobalState();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(0); // 0 = username, 1 = repo
  const [disabled, setDisabled] = useState(false);

  useLayoutEffect(() => {
    if (route.params?.type >= 0) {
      // Chek navigation push type
      setType(route.params?.type);
      setPageTitle(route.params?.type);
      return () => checkDisabled();
    }
  }, [route.params, setType, setPageTitle]);

  // Go to next navigation
  const goToNext = (route, data) => {
    // Navigate to confirmation screen
    if (type == 1) navigation.navigate('Confirm');
    // Navigate to next screen
    else {
      navigation.push(route, data);
    }
  };

  // Set input values inside global state
  const setTextValue = text => {
    switch (type) {
      case 0:
        setUsername(text);
        checkDisabled();
        break;
      case 1:
        setRepo(text);
        checkDisabled();
        break;
      default:
        return false;
    }
  };

  const setPageTitle = titleType => {
    switch (titleType) {
      case 0:
        setTitle('Type your Github Username');
        break;
      case 1:
        setTitle('Type your Github repo');
        break;
      default:
        setTitle('');
    }
  };

  // Get the values for the input
  const getDefaultValue = () => {
    switch (type) {
      case 0:
        return state?.username ? state.username : null;
      case 1:
        return state?.repo ? state.repo : null;
    }
  };

  // Disable the next button
  const checkDisabled = () => {
    switch (type) {
      case 0:
        if (state?.username) setDisabled(false);
        else setDisabled(true);
        break;
      case 1:
        if (state?.repo) setDisabled(false);
        else setDisabled(true);
      default:
        return true;
    }
  };

  return (
    <ViewScrollWrapper>
      <TextInput
        lableText={title}
        textValue={text => setTextValue(text)}
        defaultValue={() => getDefaultValue()}
      />
      <View style={styles.pageFooter}>
        <Button
          large
          style={styles.pageFooter__btn}
          disabled={disabled}
          onPress={() => goToNext('SetUp', {type: 1})}>
          <Text>done</Text>
        </Button>
      </View>
    </ViewScrollWrapper>
  );
}

const styles = StyleSheet.create({
    pageFooter: {
        ...mediumBox,
    },
    pageFooter__btn: {
        marginLeft: 'auto',
    },
});


export default SetUpScreen;
