import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {globalColors} from '../styles/colors';

function ViewScrollWrapper(props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={styles.scrollView}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: globalColors.lighter,
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewScrollWrapper;
