import React, { useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, Modal, Switch, StyleSheet, Dimensions, ScrollView } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import {NumberInput} from '../component/numberInput';

const window = Dimensions.get("window");

//second page - form page
export default function Form({navigation}){
  
  //use selector to retrieve data dispatched
  const [data, setData] = useState(useSelector((state) => state.data));

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
    }
})

