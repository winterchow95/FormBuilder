import React, { useState, useEffect } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, Modal, Switch, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {NumberInput} from '../component/numberInput';
import {setDataAction} from '../redux/action';
import { StackActions } from '@react-navigation/native';

const window = Dimensions.get("window");

//second page - form page
const Form = (props) => {
  
  const dispatcher = useDispatch();

  //use selector to retrieve data dispatched
  const [data, setData] = useState(useSelector((state) => state.data));
  const keycounter = useSelector((state) => state.keycount);
  const [modalToggle, setModalToggle] = useState(false);

  //update boolean or switch state
  const updateValue = (key, new_value) => {
    
    //if key is found, value is updated
    const _data = data.map(elem => {
      if(elem.key == key){
        return Object.assign({}, elem, {value: new_value});
      }
      return elem;
    })
  
    //whole data array is overwritten
    setData(_data);
  }

  const returnPage = (data, key)=>{
      const _data = {...data};
      dispatcher(setDataAction(_data, key));
      
      props.navigation.dispatch(
        StackActions.replace('ComponentListPage')
      );
  }

  return (
    
    <View style={{flex: 1}}>
        <Text style={{fontSize: 28, paddingVertical: 20, backgroundColor: '#117979ee', textAlign: 'center'}}>Completed Form</Text>
        <View style={styles.container}>
            <ScrollView>
                {data.map((component) => (
                    <View key={component.key}>
                        {buildComponent(component)}
                    </View>
                ))}
            </ScrollView>
        </View>

        <Modal transparent = {true} visible = {modalToggle}>
          <View style={styles.modalBackgroundView}>
            <View style={styles.modalView}>
              <Text style={{fontSize: 24, marginBottom: 40, textAlign: 'center'}}>Clear Form?</Text>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonView}><Button title="Yes" onPress={() => {returnPage([], 0)}}/></View>
                  <View style={styles.buttonView}><Button title="No" onPress={() => {returnPage(data, keycounter)}} /></View>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonView}><Button title="Cancel" onPress={() => setModalToggle(!modalToggle)} /></View>
                </View>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonContainer}>
        <View style={styles.buttonView}><Button title="Back" onPress={() => setModalToggle(!modalToggle)}/></View>
        <View style={styles.buttonView}><Button title="Validate" onPress={()=>{}} /></View>
      </View>
    </View>

  );

  //switch case to build UI component according to type selected
  function buildComponent(component) {
    switch(component.type){
      case 1:
        //Text Input
        return <View style={styles.listItem}>            
                    <TextInput style= {styles.input} placeholder= {component.title}/>
                </View>;

      case 2:
        //Number Input
        return <View style={styles.listItem}>        
                    <NumberInput style= {styles.input} placeholder= {component.title} />
                </View>;
      case 3: 
        //Boolean (Switch) Input
        return <View style={styles.listItem}>
                    <Text style={styles.title}>{component.title}</Text>
                    <Switch value = {component.value} onValueChange= {(val) => updateValue(component.key, val)} trackColor={{true: 'green', false: 'grey'}} />
                </View>;
      case 4:
        // CheckBox Input
        return <View style={styles.listItem}>
                    <Text style={styles.title}>{component.title}</Text>
                    <CheckBox disabled={false} value= {component.value} onValueChange={(val) => updateValue(component.key, val)}/>
                </View>;
      default:
        // Unknown Input, Perform Simple Error Handling
        alert("An unknown form component has been detected and will be ignored, please contact support team for in-depth investigation.");
        return null;
    }
  }

}

export default Form;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
    },
    listItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: window.width * 0.9,
        height: window.height * 0.07,
        justifyContent: 'space-between',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#000000aa',
        borderRadius: 5,
        height: '70%',
        width: window.width * 0.9,
        textAlign: 'right',
    },
    title: {
        width: window.width * 0.7,
        fontSize: 14,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonView:{
      width: '45%',
      margin: 10,
    },
    modalBackgroundView: {
      backgroundColor: "#000000aa",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView:{
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '10%',  
      borderRadius: 20,
    },
})

