import React, {useState, useEffect} from 'react';
import {StatusBar, Dimensions, StyleSheet} from 'react-native';
import {View, Button, Text} from 'native-base';
import {bigBox, mediumBox} from '../styles/view';
import RepoUrl from '../components/repoUrl';
import ViewScrollWrapper from '../components/viewScrollWrapper';
const {width, height} = Dimensions.get('window');

function HomeScreen({navigation, route}) {
  return (
    <ViewScrollWrapper>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.pageContainer]}>
        <RepoUrl username={'user'} repo={'repo'} />
      </View>
      <View style={[styles.pageFooter]}>
        <Button
          large
          style={styles.pageFooter__btn}
          onPress={() => navigation.navigate('SetUp', {type: 0})}>
          <Text>check</Text>
        </Button>
      </View>
    </ViewScrollWrapper>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    width: width,
    display: 'flex',
    justifyContent: 'space-between',
    ...bigBox
  },
  pageFooter: {
    ...mediumBox,
  },
  pageFooter__btn: {
    marginLeft: 'auto',
  },
});

export default HomeScreen;
