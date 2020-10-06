import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import Products from '../screens/productsScreens'
import Product from '../screens/productScreens'
import Cart from '../screens/cartScreens'
import Orders from '../screens/orderScreens'
import MyProducts from '../screens/myProducts'
import MyProductsEdit from '../screens/MyProductsEdit'
import Login from'../screens/loginScreen'
import SignUp from'../screens/signupScreen'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const ShopNav = createStackNavigator({
    Products:Products,
    Product:Product,
    Cart:Cart,
},{
    navigationOptions:{
        drawerIcon: icon => <FontAwesome name="shopping-bag" size={24} color="black" />
    } 
})
const orderNav = createStackNavigator({
    Orders : Orders,
},{
    navigationOptions:{
        drawerIcon: icon => <FontAwesome5 name="list-alt" size={24} color="black" />
    }
})
const myProductsNav = createStackNavigator({
    MyProducts: {
        screen:MyProducts,
    },
    MyProductsEdit : MyProductsEdit
},{
    navigationOptions:{
        drawerIcon: icon =><Entypo name="user" size={24} color="black" />
    }
})
const AuthNav = createStackNavigator({
 SignUp:SignUp,
 //Login:Login,
})
const ShopDrawer =createDrawerNavigator({
    Shop :ShopNav,
    MyOrders :{
        screen:orderNav,
        navigationOptions:{
            drawerLabel:'My Orders'
        }
    },
    Admin:{
        screen:myProductsNav,
        navigationOptions:{
            drawerLabel:'My Account'
        }
    }
},{
    drawerType:'slide'
})
const SwitchNav = createSwitchNavigator({
    Auth:AuthNav,
    Shop:ShopDrawer
})
export default createAppContainer(SwitchNav);