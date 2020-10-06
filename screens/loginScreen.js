import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,ScrollView,Button,TextInput,Alert} from 'react-native'
import { connect } from 'react-redux';
import { LOG_IN } from '../actions';

class Login extends React.Component{
   
   state={
       email:'',
       password:''
   }

   isLogIn= async ()=>{
      try {
       await this.props.LogIn(this.state.email,this.state.password)
      } catch (error) {
          Alert.alert(error)
      } 
   }
    render(){
        return(
           <SafeAreaView >
                <View>
                    <ScrollView>
                        <View style={styles.form}>
                          <View style={styles.formControl}>
                              <Text style={styles.lable}>Email: </Text>
                                  <TextInput 
                                   autoCompleteType='email'
                                   keyboardType='email-address' 
                                   autoCorrect 
                                   returnKeyType='next' 
                                   value={this.state.email} 
                                   style={styles.input}
                                   onChangeText={(email)=>{this.setState({email:email})}} />
                             </View >
                             <View style={styles.formControl}>
                              <Text style={styles.lable}>Password: </Text>
                                  <TextInput 
                                   autoCompleteType='password' 
                                   autoCorrect 
                                   returnKeyType='next' 
                                   value={this.state.password} 
                                   style={styles.input} 
                                   onChangeText={(password)=>{this.setState({password:password})}} 
                                   secureTextEntry
                                   maxLength={16}
                                   />
                             </View >
                             <View style={{marginVertical:20}}>
                                 <Button title='Login' color='red' onPress={()=>{this.isLogIn()}}/>
                                 <Button title='SginUp?' color='orange' onPress={()=>{}}/>
                             </View>
                        </View>
                    </ScrollView>
                </View>
           </SafeAreaView>
        )
    }
}
const styles =StyleSheet.create({
    form:{
        margin:20,
    },
    formControl:{
        width:'100%'
    },
    lable:{
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
})
const mapDispatchToProps=(dispatch)=>{
    return{
        LogIn:(email,password)=>{dispatch(LOG_IN(email,password))},
        
    }
    }
export default connect(null,mapDispatchToProps)(Login)