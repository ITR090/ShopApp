import {Alert} from 'react-native'
export const LOG_IN=(email,password)=>{
   
    return async dispatch=>{
        try {
            const respons = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6J-YTFw-s5A4YOdILNXtOdGv9R1YABYE',
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                    email:email,
                    password:password,
                    returnSecureToken:true,
                    }
                    )
            });
            const user_data = await respons.json()
            console.log(user_data)
            // let message;
            // if(user_data.error.message === 'EMAIL_NOT_FOUND'){
            //     console.log('eror')
            //     message='Email Not Found'
            //     throw new Error(message)
            // }
       
        dispatch({
            type:'LOG_IN',
            token:user_data.idToken,
            userId:user_data.localId,
        })
        
          
        } catch (error) {
            Alert.alert(error)
        }
   }
}
export const SGIN_UP=(email,password)=>{
    return async dispatch=>{
        try {
            const respons = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6J-YTFw-s5A4YOdILNXtOdGv9R1YABYE',
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(
                    {
                    email:email,
                    password:password,
                    returnSecureToken:true,
                    }
                    )
            });
            const user_data = await respons.json()
            let message;
            console.log(user_data)
            if(!respons.ok){
                throw new Error(respons.statusText)
            }
            if(user_data.error.message == 'EMAIL_EXISTS'){
                message='this email exists'
                throw new Error(message)
            }
            dispatch({
                type:'SGIN_UP',
                token:user_data.idToken,
                userId:user_data.localId,
            })

            
        } catch (error) {
            console.log(error)
        }
   }
}
export const SHOW_PRODUCTS=()=>{
   return async (dispatch,getState) =>{
       const userId = getState().shop.userId
    try {
         const respons = await fetch('https://react-native-shopapp-f2af2.firebaseio.com/products.json')
         const product_data  = await respons.json()
         let arrayData = [] 
       for (const data in product_data) {
        arrayData.push({
         data:data,
         id:product_data[data].id,
         name:product_data[data].name,
         image:product_data[data].image,
         description:product_data[data].description,
         price:product_data[data].price,
         userid:product_data[data].user,
         quantity:product_data[data].quantity   
        })
       }
       
        dispatch({
            type:'SHOW_PRODUCTS',
           // data:arrayData
           products:arrayData,
           myProducts:arrayData.filter(info=>info.userid == userId)
    })
    } catch (error) {
        console.log(error)
    }
   }
}

export const SHOW_MY_PRODUCTS =()=>{
    return{

    }
}
export const ADD_TO_CART=(product)=>{
    return{
        type:'ADD_TO_CART',
        data:product
    }
}
export const DELETE_FROM_CART=(id)=>{
    return{
        type:'DELETE_FROM_CART',
        data:id
    }
}
export const CART_COUNTER_ADD=()=>{
    return{
        type:'CART_COUNTER_ADD',
    }
}
export const CART_COUNTER_DELETE=()=>{
    return{
        type:'CART_COUNTER_DELETE',
    }
}
export const RESET_COUNTER=()=>{
    return{
        type:'RESET_COUNTER',
    }
}
export const SHOW_ORDERS=()=>{
    return  async (dispatch,getState)=> {
        const token = getState().shop.token
        try {
            const respons = await fetch(`https://react-native-shopapp-f2af2.firebaseio.com/orders.json?auth=${token}`)
            const product_data  = await respons.json()
           
          let arrayData = [] 
       for (const data in product_data) {
        arrayData.push(
            product_data[data]
        )
       }  
       dispatch({
                type:'SHOW_ORDERS',
                data:arrayData
            })

        } catch (error) {
            console.log(error)
        }
    }
}
export const MAKE_ORDER=(products)=>{
    return  async (dispatch,getState)=>{
        const token = getState().shop.token
        try {
        const respons = await fetch(`https://react-native-shopapp-f2af2.firebaseio.com/orders.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(products)
        })

        
        dispatch({
        type:'MAKE_ORDER',
        data:products
        })
        } catch (error) {
          console.log(error)  
        }
    }
}

export const DELETE_PRODUCT=(product)=>{
    
    return async (dispatch,getState) =>{
        const token = getState().shop.token
        try {
        let respons = await fetch(`https://react-native-shopapp-f2af2.firebaseio.com/products/${product.data}/.json?auth=${token}`,{
        method:'DELETE',       
        })
        if(respons.ok){
        dispatch({
            type:'DELETE_PRODUCT',
            data:product
        })
        }else{
            throw new Error()
        }
        } catch (error) {
            console.log(error)
        }
       
    }
}

export const ADD_PRODUCT = (product)=>{
    return async (dispatch,getState) =>{
        const token = getState().shop.token
        // any async code i want 
        try {
            const respons = await fetch(`https://react-native-shopapp-f2af2.firebaseio.com/products.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(product),
        })
        const product_data  = await respons.json()
        
        product.id=product_data.name
        dispatch({
            type :'ADD_PRODUCT',
            data:product
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export const EDIT_PRODUCT=(product)=>{
    
    return  async (dispatch,getState)=>{
        //console.log(getState())
        const token = getState().shop.token
        console.log(token)
        try {
        const respons = await fetch(`https://react-native-shopapp-f2af2.firebaseio.com/products/${product.data}.json?auth=${token}`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(product),
            })
            if(respons.ok){
                dispatch({
                    type :'EDIT_PRODUCT',
                    data:product
                })
            }else{
                throw new Error()
            }
        } catch (error) {
            console.log(error)
        }
    }
}