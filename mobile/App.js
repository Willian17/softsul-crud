import React , {useState}  from 'react';
import { StyleSheet, TextInput, Text,  View  ,TouchableOpacity , Alert} from 'react-native';

import api from './src/services/api'

export default function App() {
  const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth , setAuth] = useState({})
  
     function Auth(){
     api.post('/signin' , {email , password})
      .then(response =>{
        setAuth(response.data)
        alerta(true)
      })
      .catch(() => {
        setAuth({})
        alerta(false)
      })
    }
    function alerta(isSuccess){
        Alert.alert(
          isSuccess ? 'Parabéns!':'Erro!',
          isSuccess ? 'Usuário autenticado com sucesso!':'Email ou senha inválidos!',
          [{text: "Ok" }],
          {cancelable: true }
        )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>SoftSul</Text>
       <View style={styles.inputView} >
          <TextInput 
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
          />
       </View>
       <View style={styles.inputView} >
       <TextInput 
          style={styles.inputText}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={setPassword}
          />
       </View>
       <TouchableOpacity onPress={Auth} style={styles.loginBtn} >
          <Text style={styles.loginText}> Entrar </Text>
       </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#85cb33",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#000"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#85cb33",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText: {
    color: "white"
  }
});


