import React, {useState} from 'react';
import {Form, Input, Item, Label, View} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

function TextInput(props) {
  const setText = text => {
    props.textValue(text);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.inputBody}>
        <Form>
          <Item floatingLabel style={styles.inputBody__item}>
            <Label style={styles.inputBody__label}>{props.lableText}</Label>
            <Input
              onChangeText={text => {
                setText(text);
              }}
              value={props.defaultValue()}
            />
          </Item>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    width: width,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  inputBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    marginBottom: 'auto',
  },
  inputBody__label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBody__item: {
    paddingBottom: 10,
  },
});

export default TextInput;
