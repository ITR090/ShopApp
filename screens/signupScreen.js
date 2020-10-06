import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,ScrollView,Button,TextInput} from 'react-native'
import { connect } from 'react-redux';
import { SGIN_UP, LOG_IN } from '../actions';

class Sign extends React.Component{
    state={
        email:'',
        password:'',
        emptyData:false,
    }

    isSginUp= async()=>{
        //new user
        
       if(this.state.email && this.state.password){
       await this.props.SginUp(this.state.email,this.state.password)
      
        this.props.navigation.navigate('Shop') 
       }else{
          this.setState({
              emptyData:true
          }) 
       }
    }
    isLogIn= async()=>{
        // not new user
        if(this.state.email && this.state.password){
       await this.props.LogIn(this.state.email,this.state.password)
       console.log('befor')
        this.props.navigation.navigate('Shop')
        console.log('after')
        }else{
            this.setState({
                emptyData:true
            }) 
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
                         {this.state.emptyData 
                         ? <View>
                             <Text style={styles.emptyTexe}>You Shoud Inter Some Text</Text>
                         </View> : null }
                         <View style={{marginVertical:20}}>
                             {/* new user */}
                             <Button title='SginUp' color='red' onPress={()=>{
                                    this.isSginUp() 
                                 }}/>
                             {/* not new user */}
                             <Button title='Login' color='orange' onPress={()=>{
                                 this.isLogIn()
                             }}/>
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
    emptyTexe:{
        marginVertical:10,
       textAlign:'center'
    }
})
const mapDispatchToProps=(dispatch)=>{
    return{
        SginUp:(email,password)=>{dispatch(SGIN_UP(email,password))},
        LogIn:(email,password)=>{dispatch(LOG_IN(email,password))},
    }
    }
export default connect(null,mapDispatchToProps)(Sign)