export interface Signup{
    name:string,
    password:string,
    email:string,
}


export interface Login{
    email:string,
    password:string,
    
}


export interface Product{
    name:string,
    price:number,
    category:string,
    color:string,
    decription:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:number|undefined
}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    decription:string,
    image:string,
    id:number| undefined,
    quantity:undefined|number,
    userId:number,
    productId:number
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:number|undefined
}