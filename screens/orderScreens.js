import React from 'react';
import {View,Text,SafeAreaView,StyleSheet,TouchableOpacity,FlatList,ImageBackground} from 'react-native'
import { Feather } from '@expo/vector-icons';
import {connect} from 'react-redux'
import {SHOW_ORDERS} from '../actions/index'
class Orders extends React.Component{

    componentDidMount(){
        this.props.showOrdres()
    }
    componentDidUpdate(ps){
        if(this.props.ordres != ps.ordres){
            this.props.navigation.addListener('willFocus',()=>{
                this.props.showOrdres()
            })
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft : ()=>{
                return(
                    <TouchableOpacity onPress={()=>{navigation.toggleDrawer();}}>
                        <Feather name="menu" size={32} color="black" style={{paddingLeft:10}} />
                    </TouchableOpacity>
                )
            },
              
        };
      };
      ShowOrders=(dataitem)=>{  
       return dataitem.item.map(data=>{
        return(<View style={styles.main_view}>
                     <Text>At: {data.date}</Text>
                         <View style={styles.main_cart}>
                        <Text>Name: {data.name}</Text>
                        <ImageBackground style={styles.main_image} source={{uri:data.image}}/>
                         </View>
                      
                       <Text style={{paddingVertical:5}}>Quantity: {data.quantity}</Text>
                       <Text style={{paddingVertical:5}}>TotalPrice: {data.totalPrice}</Text>
                       
            </View>)
        })
        
      }
    render(){
        //console.log(this.props.ordres)
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
                 
                 <Text style={styles.main_text}>My Orders</Text>
                 {this.props.ordres.length==0
                 ?<Text style={styles.main_text}>You Didn't Order Anything</Text>
                 :<View>
                     <FlatList
                     data={this.props.ordres}
                     renderItem={(item)=>this.ShowOrders(item)}
                     //keyExtractor={item=>item.id}
                     />
                 </View>
                 }
                
            </SafeAreaView>
        )
    }
}

const styles =StyleSheet.create({
    main_text:{
        textAlign:'center',
        fontSize:18,
        fontWeight:'500',
        marginVertical:20
    },
    main_view:{
        margin:10,
        padding:5,
        borderWidth:0.5,
        borderRadius:5,
        
    },
    main_cart:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
        alignItems:'center',
        height:150,
    },
    main_image:{
        width:150,
        height:'100%'
    }
})
const mapStateToProps=(state)=>{
    return{
        ordres : state.shop.ordres,
    }
    }
    const mapDispatchToProps=(dispatch)=>{
        return{
            showOrdres:()=>{dispatch(SHOW_ORDERS())}  
        }
        }    
export default connect(mapStateToProps,mapDispatchToProps)(Orders)