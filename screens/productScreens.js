import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,Image,ScrollView,Button} from 'react-native'
import {connect} from 'react-redux';
import {ADD_TO_CART} from '../actions/index'
import {CART_COUNTER_ADD} from'../actions/index'
class Product extends React.Component{

    static navigationOptions = ({navigation})=>{
        return{
            title : navigation.getParam('ProductName')
        }
    }
    addToMyCart=()=>{
        
        let myCart= this.props.cart.indexOf(this.props.navigation.getParam('Product'))
        if(myCart==-1){
            this.props.addToCart(this.props.navigation.getParam('Product'))
            this.props.cartCounterAdd()
            return;
        }else{
         let product =  this.props.cart.find(product=>product.id == this.props.navigation.getParam('ProductId'))
             product.quantity+=1
             this.props.cartCounterAdd()
             return;
        }
      

    }
    render(){
        return(
          
                <ScrollView style={{backgroundColor:'#fff'}}>
                  <Image source={{uri:this.props.navigation.getParam('ProductImage')}} style={styles.image}/>
                  <Text style={styles.main_price}>{this.props.navigation.getParam('ProductPrice')}$</Text>
                  <Text style={styles.main_description}>Description: {this.props.navigation.getParam('ProductDescription')}</Text>
                <View>
                <Button 
                title='Add To Cart' 
                onPress={()=>{this.addToMyCart()}}
                />
                </View>
                
                </ScrollView>
        )
    }
} 
const styles= StyleSheet.create({
    main_price:{
        textAlign:'center',
        color:'#bbb',
        fontSize:18,
        fontWeight:'700',
        marginVertical:5
    },
    main_description:{
        
        marginVertical:5,
        padding:10,
        textAlign:'center'
    },
    image:{
        width:'100%',
        height:400
    }
})
const mapStateToProps=(state)=>{
    return{
        cart : state.shop.cart,
        cart_counter:state.shop.cart_counter
    }
    }
const mapDispatchToProps=(dispatch)=>{
    return{
        addToCart:(data)=>{dispatch(ADD_TO_CART(data))},
        cartCounterAdd:()=>{dispatch(CART_COUNTER_ADD())}
    }
    }
export default connect(mapStateToProps,mapDispatchToProps)(Product);