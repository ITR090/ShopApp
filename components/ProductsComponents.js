import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity
    ,ImageBackground,Button} from 'react-native'
import {connect} from 'react-redux';
import {ADD_TO_CART} from '../actions/index'
import {CART_COUNTER_ADD} from'../actions/index'
class ProductsComponent extends React.Component{
    
    
    // addToMyCart=()=>{
    //     let myCart= this.props.cart.indexOf(this.props.data.item)
    //     if(myCart==-1){
    //         this.props.addToCart(this.props.data.item)
    //         this.props.cartCounterAdd()
    //         return;
    //     }else{
    //         let product =  this.props.cart.find(product=>product.id == this.props.data.item.id)
    //         product.quantity+=1
    //         this.props.cartCounterAdd()
    //         return;
    //     }
    // }
    
    render(){
        return(
          <TouchableOpacity style={{flex:1}} onPress={this.props.onSelect}>
            <View style={styles.main_view}>
            <View style={{width:'100%',height:'75%',overflow:'hidden',borderRadius:5,marginVertical:10}}>
              <ImageBackground style={styles.image} source={{uri:this.props.data.item.image}}/>
            </View>
            <View style={styles.main_content}>
               <Text>Name: {this.props.data.item.name}</Text>
               <Text>Price: {this.props.data.item.price}</Text>
            </View>
            {/* <View style={{marginVertical:15}}>
                <Button title='Add To Cart' onPress={()=>{this.addToMyCart()}}/>
            </View> */}
            {
                this.props.children
            }
            </View>
        </TouchableOpacity>
        )
    }
}
const styles= StyleSheet.create({
main_view:{
    
    justifyContent:'center',
    height:350,
    backgroundColor:'#fff',
    borderRadius:10,
    shadowOpacity:0.3,
    shadowOffset:{width:0,height:2},
    margin:10,
    padding:5

},
main_content:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
},
image:{
    width:'100%',
    height:'100%'
}
});
const mapStateToProps=(state)=>{
    return{
        cart : state.shop.cart,
        cart_counter:state.shop.cart_counter
    }
    }
const mapDispatchToProps=(dispatch)=>{
return{
    addToCart:(data)=>{dispatch(ADD_TO_CART(data))},
    cartCounterAdd:()=>{dispatch(CART_COUNTER_ADD())},
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductsComponent);