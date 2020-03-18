import React, {useState, useEffect} from 'react';
import {StatusBar, Platform, StyleSheet, Dimensions} from 'react-native';
import {View, Button, Body, Text} from 'native-base';
import useGlobalState from '../context/context';
import {fetchGithub, sendGithub} from '../services/outgoing';
import {StackActions} from '@react-navigation/native';
import HeaderTitle from '../components/headerTitle';
import NetInfo from '@react-native-community/netinfo';
import ViewScrollWrapper from '../components/viewScrollWrapper';
import RepoUrl from '../components/repoUrl';
import UiMessage from '../components/uiMessage';
import {globalColors} from '../styles/colors';
import {bigBox, mediumBox} from '../styles/view';
const {width, height} = Dimensions.get('window');

function ConfirmScreen({navigation, route}) {
  const {state, setUsername, setRepo} = useGlobalState();
  const [repoUrl, setRepoUrl] = useState('');
  const [uiError, setUiError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [sendUrlResponse, setSendUrlResponse] = useState(0); // 0 = error data, 1 = error sending, 2 = correct data

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(checkConnection);
    return () => unsubscribe();
  });

  // Check connection result
  const checkConnection = async connState => {
    if (Platform.OS === 'IOS') {
      await setConnectionErrors(connState.isConnected);
    } else {
      await setConnectionErrors(connState.isInternetReachable);
    }
  };

  // Set error connection
  const setConnectionErrors = async start => {
    if (!start) {
      setConnectionError(true);
    } else {
      connectionError && setConnectionError(false);
      // When connection is stable check Github repo url
      await checkUrlValidity();
    }
  };

  // Check if repository exist
  const checkUrlValidity = async () => {
    const url = await fetchRepo();
    console.log(url);
    if (url) {
      // Set repository url
      setRepoUrl(url);
      // Set appropriate header
      navigation.setOptions({
        headerTitle: props => (
          <HeaderTitle {...props} pageName={'correct! send it!'} />
        ),
        headerBackTitleVisible: false,
      });
    } else {
      // Set error
      !uiError && setUiError(true);
      // Set appropriate header
      navigation.setOptions({
        headerTitle: props => <HeaderTitle {...props} pageName={'errors!'} />,
        headerBackTitleVisible: false,
      });
    }
  };

  // Fetch repository
  const fetchRepo = async () => {
    const {username, repo} = state;
    // username exception
    const response = await fetchGithub(username);
    if (!response.length) return false;
    // repository exception
    const result = response.filter(data => data.name === repo);
    if (!result.length) return false;
    // Success
    else return result[0].html_url;
  };

  // Send repository url
  const sendIt = async () => {
    const response = await sendGithub(repoUrl);
    if (response) {
      setSendUrlResponse(2);
      navigation.setOptions({
        headerLeft: () => null,
      });
    } else {
      setSendUrlResponse(1);
      setUiError(true);
    }
  };

  // Reset all
  const resetAll = () => {
    setUsername('');
    setRepo('');
    navigation.dispatch(StackActions.popToTop());
  };

  console.log('sendUrlResponse: ', sendUrlResponse);

  const errorClass = uiError || connectionError ? styles.viewError : null;
  const successClass = sendUrlResponse == 2 && styles.viewSuccess;

  return (
    <ViewScrollWrapper>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.pageContainer, errorClass, successClass]}>
        <RepoUrl username={state.username} repo={state.repo} />
        {uiError && sendUrlResponse == 1 && (
          <UiMessage
            messageType={styles.viewError}
            messageText={'Error sending url! Please retry later!'}
          />
        )}
        {uiError && sendUrlResponse == 0 && !connectionError && (
          <UiMessage
            messageType={styles.viewError}
            messageText={'Error with data! Check username or repository name'}
          />
        )}
        {uiError && connectionError && (
          <UiMessage
            messageType={styles.viewError}
            messageText={
              'Error with connection! Please check your internet connection!'
            }
          />
        )}
        {sendUrlResponse == 2 && (
          <UiMessage
            messageType={styles.viewSuccess}
            messageText={'Success! Repository was sent!'}
          />
        )}
      </View>
      <View
        style={[
          styles.pageFooter,
          uiError && styles.viewError,
          sendUrlResponse == 2 && styles.viewSuccess,
        ]}>
        {sendUrlResponse == 0 && (
          <Button
            large
            disabled={!repoUrl}
            style={styles.pageFooter__btn}
            onPress={() => {
              sendIt();
            }}>
            <Text>send</Text>
          </Button>
        )}
        {sendUrlResponse == 2 && (
          <Button
            large
            disabled={!repoUrl}
            style={styles.pageFooter__btn}
            onPress={() => {
              resetAll();
            }}>
            <Text>repeat</Text>
          </Button>
        )}
      </View>
    </ViewScrollWrapper>
  );
}

const styles = StyleSheet.create({
  viewError: {
    backgroundColor: globalColors.red,
  },
  viewSuccess: {
    backgroundColor: globalColors.green,
  },
  pageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    width: width,
    display: 'flex',
    justifyContent: 'space-between',
    ...bigBox,
  },
  pageFooter: {
    ...mediumBox,
  },
  pageFooter__btn: {
    marginLeft: 'auto',
  },
});

export default ConfirmScreen;
