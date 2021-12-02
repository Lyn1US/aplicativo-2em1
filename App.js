import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  Constants  from 'expo-constants';
import * as Contacts from 'expo-contacts';
import { Camera } from 'expo-camera';


export default function App() {

  console.disableYellowBox = true;

  const [contacts, setContacts] = useState();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Não temos acesso a camêra</Text>;
  }

  return (
    <View style={styles.background}>

      <View style={styles.header}>
        <Text style={styles.headerTxt}>app double task</Text>
      </View>

      <View style={styles.body}>
       
        <View style={styles.instructionsContainer}>
          <Text style={styles.title}>Lista e Camêra:</Text>
          <Text style={styles.instructions}>→ Conceda as devidas permissões!</Text>
        </View>

        <TouchableOpacity  style={styles.contactView}>
          <Text style={styles.contactTxt}>Lista de Contatos</Text>
          <Ionicons name='call-outline' size={25} color='white'/>
        </TouchableOpacity>

        <View style={styles.listViewContainer}>
          <FlatList style={styles.listView}
            data={contacts}
            keyExtractor={item=>item.id}
            renderItem={({item})=>{
              return(
                <TouchableOpacity onPress={()=>alert(item.phoneNumbers )} style={styles.item}>
                  <Text style={styles.itemTxt}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          >  
          </FlatList>
        </View>

        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type}>
            
            <View style={styles.cameraBox}>
              <TouchableOpacity onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }} 
                style={styles.cameraView}
              >
                <Ionicons name='camera-outline' size={25} color='white' />

              </TouchableOpacity>
            </View>

          </Camera>
        </View>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  header:{
    width: '100%',
    height: 85,
    backgroundColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },  

  headerTxt:{
    fontSize: 24,
    textTransform: 'uppercase',
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '400',
  },

  body:{ 
    width: '100%',
    height: '100%',
    backgroundColor: '#5A5A5A',
    alignItems: 'center',
  },

  instructionsContainer:{
    marginTop: 10,
    width: 350,
    height: 75,
    backgroundColor: '#666666',
    borderRadius: 10,
    alignItems: 'center',
  },

  title:{
    marginTop: 5,
    color: '#FFF',
    fontSize: 21,
    textAlign: 'center',
  },

  instructions:{
    marginTop: 7,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },

  contactView:{
    marginTop: 10,
    backgroundColor: '#838383',
    width: '65%',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  contactTxt:{
    marginRight: 10,
    color: '#FFF',
    fontSize: 21,
    fontWeight: '400',
    textAlign: 'center',
  },

  cameraView:{
    marginTop: 10,
    backgroundColor: '#838383',
    width: '65%',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  cameraTxt:{
    marginRight: 10,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },

  //

  listViewContainer:{
    marginTop: 10,
    width: '65%',
    height: 135,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 5,
  },

  item:{
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '85%',
    height: 40,
    backgroundColor: '#444444',
    borderWidth: 2,
    borderColor: '#369FFF',
  },
  itemTxt: {
    textAlign: 'center',
    color: '#FFF',
  },

  cameraContainer:{
    borderRadius: 10,
    width: 230,
    height: 290,
    backgroundColor: 'white'
  },

  cameraBox:{
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
