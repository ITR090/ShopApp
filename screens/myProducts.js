import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,TouchableOpacity,FlatList,Alert} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import ProductsComponents from  '../components/ProductsComponents';
import {DELETE_PRODUCT} from '../actions/index'
//import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
class MyProducts extends React.Component{
    componentDidUpdate(ps){
        if(this.props.myProducts != ps.myProducts){
            this.forceUpdate();
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title:'My Products',
            headerRight : ()=>{
                return(
                <TouchableOpacity onPress={()=>{navigation.navigate('MyProductsEdit')}}>
                  <Ionicons name="md-add-circle-outline" style={{paddingRight:10}} size={32} color="black" />  
                </TouchableOpacity>
                )
            } ,
            headerLeft : ()=>{
                return(
                    <TouchableOpacity onPress={()=>{navigation.toggleDrawer();}}>
                        <Feather name="menu" size={32} color="black" style={{paddingLeft:10}} />
                    </TouchableOpacity>
                )
            },  
        };
      };
      onDelete=(id)=>{
          Alert.alert('Are You sure' , 'Do you want to delet this item?',[
              {text:'No',style:'default'},
              {text:'Yes',style:'destructive',onPress:()=>{
                this.props.DeleteProduct(id)
                this.forceUpdate();
              }}
          ])
      }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <FlatList
            data={this.props.myProducts}
            keyExtractor={item=>item.id}
            renderItem={(dataitem)=>
            <ProductsComponents
            data={dataitem}
            onSelect={()=>{}}
            >
            <View style={styles.Bouttons}>
            <View style={{marginVertical:15}}>
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('MyProductsEdit',{
                    ProductId:dataitem.item.id,
                    ProductName:dataitem.item.name,   
                })}
                >
                     <FontAwesome name="edit" size={32} color="orange" />
                </TouchableOpacity>
            </View>
            <View style={{marginVertical:15}}>
                <TouchableOpacity
                onPress={()=>{
                    this.onDelete(dataitem.item)
                    //this.props.DeleteProduct(this.props.myProducts.indexOf(dataitem.item))
                    // this.props.DeleteProduct(dataitem.item.id)
                    // this.forceUpdate();
                }}
                >
                    <Feather name="trash" size={32} color="red" />
                </TouchableOpacity>
                
            </View>
            </View>
            </ProductsComponents>}
            />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    Bouttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5
    },
})
const mapStateToProps=(state)=>{
    return{
        myProducts : state.shop.myProducts,
    }
    }
const mapDispatchToProps=(dispatch)=>{
        return{
            DeleteProduct:(data)=>{dispatch(DELETE_PRODUCT(data))},
        }
        }
export default connect(mapStateToProps,mapDispatchToProps)(MyProducts)