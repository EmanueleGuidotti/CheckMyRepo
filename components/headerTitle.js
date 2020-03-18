import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Text, View} from 'native-base';

const HeaderTitle = props => {
  return (
    <View style={styles.homeHeader}>
      <Text style={styles.homeHeader__text}>{props.pageName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    backgroundColor: 'transparent',
  },
  homeHeader__text: {
    fontSize: Platform.OS === 'ios' ? 15 : 12,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
});

export default HeaderTitle;
