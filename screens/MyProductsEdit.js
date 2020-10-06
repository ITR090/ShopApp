import React from 'react';
import {Text,SafeAreaView,View ,TextInput,StyleSheet,ScrollView,Button,Alert} from 'react-native'
import {connect} from 'react-redux'
import {ADD_PRODUCT} from  '../actions/index'
import {EDIT_PRODUCT} from '../actions/index'
class MyProductsEdit extends React.Component{
    
    state={
        Name:'',
        ImageUrl:'',
        Description:'',
        Price:0,
    }
    componentDidMount(){
        const isExist =   this.props.myProducts.find(myProduct=>myProduct.id == this.props.navigation.getParam('ProductId'))
        if(isExist != undefined){
            this.setState({
                Name:isExist.name,
                ImageUrl:isExist.image,
                Description:isExist.description,
                Price:isExist.price
            })
        }
    }
    saveMyProduct=()=>{
        let name =this.state.Name
        let imageurl =this.state.ImageUrl
        let description =this.state.Description
        let price =this.state.Price
    
        const isExist =this.props.myProducts.find(myProduct=>myProduct.id == this.props.navigation.getParam('ProductId'))
        if(name && imageurl && description && price){
            if(isExist == undefined){
                //new pro
                const newProduct={
                   id:Math.random().toString(36).substring(2, 15),
                   name:name.trim(),
                   image:imageurl.trim(),
                   user:this.props.userId,
                   description:description.trim(), 
                   price:parseFloat(price).toFixed(2).trim(),
                   quantity:1
                }
                this.props.AddProduct(newProduct)
            }else{
               //Edit pro
               isExist.name=name
               isExist.image=imageurl
               isExist.description=description
               isExist.price=price
            //    const newProduct={
            //       id:Math.random().toString(36).substring(2, 15),
            //       name: isExist.name,
            //       image:isExist.imageurl,
            //       user:'u1',
            //       description: isExist.image,
            //       price:parseFloat(isExist.price).toFixed(2),
            //       quantity:1,
            //    }
            this.props.EditProduct(isExist)
            
            }
            //this.forceUpdate();
            this.props.navigation.goBack()
        }else{
            Alert.alert('Empty Felides','You must fil all the form',[
                {text:'Okay'}
            ])
            return
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: (navigation.getParam('ProductName')) ? navigation.getParam('ProductName') : 'Create Product'
            // headerRight : ()=>{
            //     return(
            //     <TouchableOpacity onPress={()=>{}}>
            //       <Ionicons name="md-add-circle-outline" style={{paddingRight:10}} size={32} color="black" />  
            //     </TouchableOpacity>
            //     )
            // } ,
            // headerLeft : ()=>{
            //     return(
            //         <TouchableOpacity onPress={()=>{navigation.toggleDrawer();}}>
            //             <Feather name="menu" size={32} color="black" style={{paddingLeft:10}} />
            //         </TouchableOpacity>
            //     )
            // }  
        };
      };
    
    render(){
        return(
            <SafeAreaView>
               <ScrollView>
                <View style={styles.form}>
                  <View style={styles.formControl}>
                      <Text style={styles.lable}>Name: </Text>
                      <TextInput 
                        autoCompleteType='name' 
                        autoCorrect 
                        autoCapitalize='sentences' 
                        returnKeyType='next' 
                        
                        value={this.state.Name} style={styles.input} onChangeText={text =>this.setState({Name:text})} />
                  </View >
                  <View style={styles.formControl}>
                      <Text style={styles.lable}>ImageUrl: </Text>
                      <TextInput
                      keyboardType='url'
                      value={this.state.ImageUrl}  style={styles.input} onChangeText={text =>this.setState({ImageUrl:text})}/>
                  </View >
                  <View style={styles.formControl}>
                      <Text style={styles.lable}>Description: </Text>
                      <TextInput value={this.state.Description} style={styles.input} onChangeText={text =>this.setState({Description:text})}/>
                  </View >
                  <View style={styles.formControl}>
                      <Text style={styles.lable}>Price: </Text>
                      <TextInput keyboardType='decimal-pad' value={String(this.state.Price)} style={styles.input} onChangeText={text =>this.setState({Price:text})}/>
                  </View >
                  <View style={styles.button}>
                    <Button title='Save' color='orange' onPress={()=>{this.saveMyProduct()}}/>
                </View>
                </View > 
                
               </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles =StyleSheet.create({
   form:{
       margin:20
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
   button:{
       marginVertical:20,
       padding:10,
       borderWidth:1,
       borderRadius:10,
       borderColor:'orange'
   }
})
const mapStateToProps=(state)=>{
    return{
        myProducts : state.shop.myProducts,
        userId:state.shop.userId
    }
    }
const mapDispatchToProps=(dispatch)=>{
        return{
            AddProduct:(data)=>{dispatch(ADD_PRODUCT(data))},
            EditProduct:(data)=>{dispatch(EDIT_PRODUCT(data))},
        }
        }    
export default connect(mapStateToProps,mapDispatchToProps)(MyProductsEdit)