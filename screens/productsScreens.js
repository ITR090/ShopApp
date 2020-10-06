import React from 'react';
import {FlatList,SafeAreaView,TouchableOpacity,Text,Button,View,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import ProductsComponents from'../components/ProductsComponents';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {ADD_TO_CART} from '../actions/index'
import {CART_COUNTER_ADD} from'../actions/index'
import {SHOW_PRODUCTS} from '../actions/index'
class Products extends React.Component{

    // state={
    //     show:false
    // }
    componentDidMount(){
      
        // this.setState({
        //     show:true
        // })
      this.props.showAllProducts()
    //   this.setState({
    //     show:false
    // })
       
    }
    componentDidUpdate(ps){
        if(this.props.cart_counter != ps.cart_counter){
            this.props.navigation.setParams({
                Cart_counter: this.props.cart_counter
            })
        }

        if(this.props.Products != ps.Products){
           this.props.navigation.addListener('willFocus',()=>{
            this.props.showAllProducts()
           }) 
        }
    }    
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight : ()=>{
                return(
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={{flexDirection:'row'}}>
                  <Text>{navigation.getParam('Cart_counter')}</Text><FontAwesome name="shopping-cart" size={32} style={{paddingRight:10}} color="black" />
                </TouchableOpacity>
                )
            } ,
            headerLeft : ()=>{
                return(
                    <TouchableOpacity onPress={()=>{navigation.toggleDrawer();}}>
                        <Feather name="menu" size={32} color="black" style={{paddingLeft:10}} />
                    </TouchableOpacity>
                )
            }  
        };
      };
      addToMyCart=(data)=>{
        let myCart= this.props.cart.indexOf(data)
        if(myCart==-1){
            this.props.addToCart(data)
            this.props.cartCounterAdd()
            return;
        }else{
            let product =  this.props.cart.find(product=>product.id ==data.id)
            product.quantity+=1
            this.props.cartCounterAdd()
            return;
        }
    }

    ShowProducts=(dataitem)=>{
        return(
        <ProductsComponents
        data={dataitem}
        onSelect={()=>this.props.navigation.navigate('Product',
        {
         Product:dataitem.item, 
         ProductId:dataitem.item.id,  
         ProductName:dataitem.item.name,
         ProductPrice:dataitem.item.price,
         ProductDescription:dataitem.item.description,
         ProductImage:dataitem.item.image,
         ProductQuantity:dataitem.item.quantity   
        })}
        >
             <View style={{marginVertical:15}}>
                <Button title='Add To Cart' onPress={()=>{this.addToMyCart(dataitem.item)}}/>
            </View>
        </ProductsComponents>
        )
    }
    render(){

        // if(this.state.show){
        //     return <View style={{flex:1}}>
        //         <ActivityIndicator style={{justifyContent:'center',alignItems:'center',marginVertical:20}} color='blue' size='large' />
        //     </View>
        // }else
        //console.log(this.props.Products)
        return(
            <SafeAreaView style={{backgroundColor:'#fff',flex:1}}>
                <FlatList
                renderItem={this.ShowProducts}
                keyExtractor={item=>item.id}
                data={this.props.Products}
                />
            </SafeAreaView>  
        )
    }
}

const mapStateToProps=(state)=>{
return{
    Products : state.shop.products,
    cart_counter:state.shop.cart_counter,
    cart : state.shop.cart,
}
}
const mapDispatchToProps=(dispatch)=>{
    return{
        addToCart:(data)=>{dispatch(ADD_TO_CART(data))},
        cartCounterAdd:()=>{dispatch(CART_COUNTER_ADD())},
        showAllProducts:()=>{dispatch(SHOW_PRODUCTS())}
    }
    }
export default connect(mapStateToProps,mapDispatchToProps)(Products);