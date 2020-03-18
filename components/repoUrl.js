import React from 'react';
import {globalColors} from '../styles/colors';
import {Text, View} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {mediumBox} from '../styles/view';

function RepoUrl(props) {
  return (
    <View style={styles.pageBody}>
      <Text style={[styles.pageH1, styles.txtBlack]}>github.com</Text>
      <TouchableOpacity>
        <Text style={[styles.pageH1, styles.txtGrey]}>
          {'/' + props.username}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={[styles.pageH1, styles.txtGrey]}>{'/' + props.repo}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBody: {
    marginRight: 'auto',
    ...mediumBox,
    display: 'flex',
    marginBottom: 'auto',
  },
  pageH1: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  txtBlack: {
    color: globalColors.black,
  },
  txtGrey: {
    color: globalColors.grey,
  },
});
export default RepoUrl;
