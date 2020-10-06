import React from 'react';
import {SafeAreaView,FlatList,View,Text,ImageBackground,StyleSheet
       ,TouchableOpacity,
       Button} from 'react-native'
import {connect} from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import {DELETE_FROM_CART} from '../actions/index'
import {CART_COUNTER_DELETE} from '../actions/index'
import {RESET_COUNTER} from'../actions/index'
import {MAKE_ORDER} from'../actions/index'
import { ThemeContext } from 'react-navigation';
class Cart extends React.Component{

    static navigationOptions = {
        title: 'My Cart',
      };

    //  componentDidUpdate(ps){
    //      if(this.props.cart != ps.cart){

    //      }
    //  }
    myCart=(dataitem)=>{
        return(
                 <View style={{padding:5}}>
                     <View style={styles.main_cart}>
                     <TouchableOpacity onPress={()=>{
                         const product = this.props.cart.find(p=>p.id == dataitem.item.id)
                         if(product.quantity >=2){
                             product.quantity-=1
                             this.props.cartCounterDelete()
                             this.forceUpdate(); //update the holl class
                         }else{
                            const Product=this.props.cart.indexOf(dataitem.item)
                            this.props.DeleteFromCart(Product)
                            this.props.cartCounterDelete()
                            this.forceUpdate(); //update the holl class
                         }
                     }}>
                        <EvilIcons name="trash" size={32} color="red"  style={{padding:5}} />
                     </TouchableOpacity>
                    <Text>Name: {dataitem.item.name}</Text>
                    <ImageBackground style={styles.main_image} source={{uri:dataitem.item.image}}/>
                     </View>
                    <Text>Quantity: {dataitem.item.quantity}</Text>
                 </View>
        )
    }  
    render(){
       let sum=0
       this.props.cart.map(Product=>{
           sum = sum+(Product.price*Product.quantity)
           return sum
       })
        return(
            <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
                
                <View style={styles.cart_viwe}>
                   <View>
                   <Text style={styles.main_text}>Total: ${Math.round(sum.toFixed(2) *100) / 100}</Text>
                   </View>
                   <View>
                   <Button disabled={this.props.cart.length === 0} title='Order Now' color='red' onPress={()=>{
                        let productDate = new Date();
                        this.props.cart.forEach(element => {
                            element.date=productDate.getFullYear()+'-'+(productDate.getMonth()+1)+'-'+productDate.getDate();
                            element.totalPrice=sum
                        });
                        this.props.makeOrder(this.props.cart);
                        this.props.cart.splice(0);
                        this.props.resetCounter();
                        this.forceUpdate();
                    }}/>
                   </View>
                </View>
                {this.props.cart.length==0 
                ?
                <Text style={styles.cart_text}>No Products In Your Cart</Text>
                :
                <>
                <FlatList
                data={this.props.cart}
                renderItem={this.myCart}
                keyExtractor={item=>item.id}
                />
                <View>
                   
                </View>
                </>
                
                }
            </SafeAreaView>
        )
    }
} 
const styles =StyleSheet.create({
    main_text:{
        textAlign:'center',
        marginVertical:20,
        fontSize:25,
        fontWeight:'700',
    },
    cart_viwe :{
        flexDirection:'row',
        shadowOpacity:0.3,
        shadowOffset:{width:0,height:2},
        justifyContent:'space-between',
        alignItems:'center',
        padding:5,
        borderRadius:10,
        margin:10,
        //borderWidth:1,
        elevation:5,
        backgroundColor:'#fff'
    },
    cart_text:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'500',
        marginVertical:10
    },
    main_cart:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        alignItems:'center',
        height:150
    },
    main_image:{
        width:150,
        height:'100%'
    }
})
const mapStateToProps=(state)=>{
    return{
        cart : state.shop.cart,
    }
    }
    const mapDispatchToProps=(dispatch)=>{
        return{
            DeleteFromCart:(data)=>{dispatch(DELETE_FROM_CART(data))},
            cartCounterDelete:()=>{dispatch(CART_COUNTER_DELETE())},
            resetCounter:()=>{dispatch(RESET_COUNTER())},
            makeOrder:(product)=>{dispatch(MAKE_ORDER(product))},
        }
        }  
export default connect(mapStateToProps,mapDispatchToProps)(Cart);