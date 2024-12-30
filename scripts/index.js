let BAGITEM = [];

onLOAD();
function displayItemsOnHome() {
    let itemsContainerElement = document.querySelector('.itemsContainer');
    let newHtml = '';
    if (!itemsContainerElement) {
        return;
    }
    items.forEach(item => {
        newHtml += `
        <div class="itemContainer">
        <div class="imgCont"><img class="itemImg" src="${item.itemImg}" alt="item-img"></div>
            <div class="rating">
            ${item.rating.itemRating}⭐${item.rating.itemReviews},
            </div>
            <div class="companyName">
                ${item.companyName}
            </div>
            <div class="itemName">
                ${item.itemName}
            </div>
            <div class="Price">
            <span class="currentPrice">Rs ${item.price.currentPrice}</span>
                <span class="originalPrice">Rs ${item.price.originalPrice}</span>
                <span class="Discount">
                (${item.price.Discount}% OFF)
                </span>
            </div>
            <button class="ADD" onclick="AddToBag(${item.id})">Add to Bag</button>
        </div>`
    });

    itemsContainerElement.innerHTML = newHtml;

};

function AddToBag(itemId) {
    BAGITEM.push(itemId);
    localStorage.setItem('bagitems', JSON.stringify(BAGITEM));
    displaybag();
};
function displaybag() {
    let bagElement = document.querySelector('.bagitems');
    if (BAGITEM.length > 0) {
        bagElement.style.visibility = 'visible';
        bagElement.innerText = BAGITEM.length;
    }
    else {
        bagElement.style.visibility = 'hidden';
    }
}
function onLOAD() {
    let bagStr = localStorage.getItem('bagitems');
    BAGITEM = bagStr ? JSON.parse(bagStr) : [];
    displayItemsOnHome();
    displaybag();
}