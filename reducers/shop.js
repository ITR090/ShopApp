import PRODUCTS from '../data/original'
const shopData ={
    products:[],
    cart:[],
    cart_counter:0,
    ordres:[],
    myProducts:[],//PRODUCTS.filter(userProducts=>userProducts.user === 'u1')
    token:'',
    userId:'',
}

export const shopReducer=(state=shopData,action)=>{

    switch (action.type) {
        case 'LOG_IN':
            return{
                ...state,
                token:action.token,
                userId:action.userId
            }
        case 'SGIN_UP':
            return{
                ...state,
                token:state.token,
                userId:state.userId
            }
        case 'SHOW_PRODUCTS':
            return{
                ...state,
                products:action.products,
                myProducts:action.myProducts//.filter(userProducts=>userProducts.user === 'u1')
            }
            case 'SHOW_ORDERS':
            return{
                ...state,
                ordres:action.data
            }
        case 'ADD_TO_CART':
            return{
                ...state,
                cart: state.cart.concat(action.data),
            }
        case 'DELETE_FROM_CART':
            return{
                ...state,
                cart: [
                    ...state.cart.splice(0,action.data),
                    ...state.cart.splice(1)
                ]
            }
        case 'CART_COUNTER_ADD':
            return{
                ...state,
                cart_counter: state.cart_counter+1
            }  
        case 'CART_COUNTER_DELETE':
            return{
                ...state,
                cart_counter: state.cart_counter-1
            } 
        case 'RESET_COUNTER':
            return{
                ...state,
                cart_counter: state.cart_counter=0
            }             
        case 'MAKE_ORDER':
            return{
                ...state,
                ordres : state.ordres.concat(action.data)
            } 
        case 'DELETE_PRODUCT':
            return{
                ...state,
                myProducts:state.myProducts.filter(myproducts=>myproducts.id != action.data),
                products:state.products.filter(products=>products.id != action.data)
                
            }
            case 'EDIT_PRODUCT':
                const editMyProductsIndex= state.myProducts.findIndex(myproduct=>myproduct.id == action.data.id); 
                const myProductsUpdate=[...state.myProducts]
                myProductsUpdate[editMyProductsIndex]=action.data

                const editProductsUpdateIndex = state.products.findIndex(product=>product.id == action.data.id)
                const ProductsUpdate=[...state.products]
                ProductsUpdate[editProductsUpdateIndex]=action.data
                return{
                    ...state,
                    myProducts:myProductsUpdate,
                    products:ProductsUpdate
                }        
            case 'ADD_PRODUCT':
                return{
                    ...state,
                    myProducts: state.myProducts.concat(action.data),
                    products:state.products.concat(action.data),
                }       
        default:
            return state
    }
}
