const user = {
    name:"Arun",
    active:true,
    cart:[],
    purchases:[]
}

// console.log(purchaseItem(user,{name:'Ball' , price:340}));
// console.log(purchaseItem(user,{name:'Ball2' , price:340}));
// console.log(user);

const compose = (f,g) =>(...args) => (f(g(...args)));


console.log(
    purchaseItem(
        emptyCart,
        buyItem,
        applyTaxToItems,
        addItemToCart
    )(user,{name:'Tiffin' , price : 2500}));


function purchaseItem( ...fns){
    return fns.reduce(compose)
    // return Object.assign({} , user , user.purchases.push(item));
}

function addItemToCart(user , item){
    const updateToCart = user.cart.concat(item);
    return Object.assign({},user,{cart:updateToCart});
}

function applyTaxToItems(user){
    const {cart} = user;
    const taxRate = 1.3;
    const updateCart = cart.map(item => {
        return {
            name: item.name,
            price: item.price * taxRate 
        }
    });
    return Object.assign({},user, {cart : updateCart});
}

function buyItem(user) {
    return Object.assign({},user , {purchases : user.cart});
}

function emptyCart(user){
    return Object.assign({},user , {cart:[]});
}