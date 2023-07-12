// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//close cart

closeCart.onclick = () => {
    cart.classList.remove("active");
};


//Cart Working

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready();
}

// Making Function

function ready(){
    //remove items
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    // console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)

    }
    //Quantity
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName('add-to-cart-btn')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    //buy button
    document.getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

//buy button wokrs

function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


//Remove Items From Cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

//addtocart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var img = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, img);
    updatetotal();
}

function addProductToCart(title, price, img) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cart-shop");

    var cartBoxContent = `
        <img src="${img}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove -->
        <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}

var addCart = document.getElementsByClassName('add-to-cart-btn');
for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
}


// update total

function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartShopes = cartContent.getElementsByClassName("cart-shop");
    var total = 0;

    for (var i = 0; i < cartShopes.length; i++){
        var cartShop = cartShopes[i]
        var priceElement = cartShop.getElementsByClassName("cart-price")[0];
        var quantityElement = cartShop.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₱", ""))
        var quantity = quantityElement.value;
        total = total + (price * quantity); 
    }
        document.getElementsByClassName('total-price')[0].innerText = '₱' + total;
    
}