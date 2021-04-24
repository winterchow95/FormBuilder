import React, {useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {setDataAction} from '../redux/action';

// first page - component list page
export default function ComponentList({navigation}){
  //dispatcher to dispatch store data action
  const dispatcher = useDispatch();
  
  //modal toggle variable
  const [modalToggle, setModalToggle] = useState(false);

  //new UI component type variable
  const [selectedType, setSelectedType] = useState(1);

  //new UI component title variable
  const [componentTitle, setComponentTitle] = useState('');

  //array that stores all created UI components
  const [components, setComponents] = useState([]);

  //key counter to increment UI component key attribute
  const [keycounter, setKeyCounter] = useState(0);
  
  //dummy configuration table to show available UI component types
  const componentTypes = new Map();
  componentTypes.set(1, "Text Input");
  componentTypes.set(2, "Number Input");
  componentTypes.set(3, "Boolean Input");
  componentTypes.set(4, "CheckBox Input");

  //create new UI component
  const addComponent = (new_type, new_title)=>{
    const _key = keycounter + 1;
    const _components = [...components];

    //if checkbox or switch, default value of false is given
    if(new_type == 3 || new_type == 4){
      _components.push({key: _key, type: new_type, title: new_title, value: false});
    }else{
      _components.push({key: _key, type: new_type, title: new_title});
    }
    
    //update array
    setComponents(_components);
    //update counter
    setKeyCounter(_key);
    //close modal
    setModalToggle(!modalToggle);
    //reset UI type and UI title
    setSelectedType(1);
    setComponentTitle("");
  }
  
  //update array except for specific component to remove from array
  const deleteComponent = (key)=>{
    const _components = components.filter((component,index) => index != key);
    setComponents(_components);
  }

  //reset array and counter to clear all components
  const clearComponents = (key)=>{
    setComponents([]);
    setKeyCounter(0);
  }

  //dispatch components to second page using redux and navigate to second page
  const generateUI = (data)=> {
    dispatcher(setDataAction(data));
    navigation.navigate('FormPage');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputsContainer}>
      {components.map((component, key)=>(
            <View style={styles.inputContainer} key={component.key}>
              <Text> <Text style={{fontSize: 18}}>{component.title} </Text> <Text style={{color: '#555', fontSize: 14}}> (Type : {componentTypes.get(component.type)}) </Text></Text>
              <TouchableOpacity onPress = {()=> deleteComponent(key)}>
                <Text style={{color: "red", fontSize: 16}}>Delete</Text>
              </TouchableOpacity> 
            </View>
          ))
      }
      </ScrollView>
        <Modal transparent = {true} visible = {modalToggle}>
          <View style={styles.modalBackgroundView}>
            <View style={styles.modalView}>
              <Text style={{fontSize: 24, marginBottom: 40, textAlign: 'center'}}>Add Form Component</Text>
              <Picker
                style={styles.pickerStyle}
                itemStyle = {{width: '20%'}}
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedType(parseInt(itemValue))
                }>
                <Picker.Item label="Text Input" value="1" />
                <Picker.Item label="Number Input" value="2" />
                <Picker.Item label="Boolean Input" value="3" />
                <Picker.Item label="CheckBox Input" value="4" />
              </Picker>
              <TextInput style={styles.textInput} placeholder={"New Component Title"} onChangeText={(val) => setComponentTitle(val)}>

              </TextInput>

              <View style={{marginTop: 50, flexDirection: 'column', alignItems: 'center'}}>                
                <View style={{width: '80%', margin: 5}}><Button title="Add Component" onPress={() => (addComponent(selectedType, componentTitle))}></Button></View>
                <View style={{width: '80%', margin: 5}}><Button title="Cancel" onPress={() => setModalToggle(!modalToggle)}></Button></View>
              </View>              
            </View>
          </View>

        </Modal>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonView}><Button title="Add" onPress={() => setModalToggle(!modalToggle)}/></View>
        <View style={styles.buttonView}><Button title="Clear" onPress={clearComponents} /></View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.fullButtonView}><Button title="Generate" onPress={() => generateUI(components)} /></View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  inputsContainer: {
    flex: 1, marginBottom: 20
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: 50,
    borderBottomColor: "lightgray"
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
  fullButtonView: {
    width: '95%',
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
  pickerStyle: {
    margin: 5,
  }
})