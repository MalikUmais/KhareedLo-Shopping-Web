let bagObj;
function loadBagItems() {
  bagObj = BAGITEM.map((itemID) => {
    for (let i = 0; i < items.length; i++) {
      if (itemID == items[i].id) {
        return items[i];
      }
    }
  });
}
function displayBagSummary() {
  let TotalMRP = 0;
  let DiscountOnMRP = 0;
  let covienienceFEE = 99;
  bagObj.forEach((itemsobj) => {
    TotalMRP += itemsobj.price.originalPrice;
    DiscountOnMRP += itemsobj.price.originalPrice - itemsobj.price.currentPrice;
  });
  let totalAmount = 0;
  totalAmount += TotalMRP - DiscountOnMRP + covienienceFEE;
  let bagSummaryElement = document.querySelector(".bag-summary");

  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${BAGITEM.length} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">Rs ${TotalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-Rs ${DiscountOnMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">Rs ${covienienceFEE}</span>
      </div>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs ${totalAmount}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div>PLACE ORDER</div>
    </button>
    <div class="order-confirmation">Order Confirmed</div>
  `;
}
function confirmOrderDISP() {
  let btn = document.querySelector(".btn-place-order");
  btn.addEventListener("click", function () {
    const confirmationDiv = document.querySelector(".order-confirmation");
    confirmationDiv.style.display = "block"; // Show the confirmation message
  });
}

function displayBagItems() {
  let bgItems = document.querySelector(".bag-items-container");
  let newHtml = "";
  bagObj.forEach((bagItem) => {
    newHtml += generatenewHTML(bagItem);
  });
  bgItems.innerHTML = newHtml;
}
function removeITEM(itemID) {
  let found = false;
  BAGITEM = BAGITEM.filter((bagId) => {
    if (!found && bagId === itemID) {
      found = true; // Set the flag after the first match
      return false; // Exclude this occurrence
    }
    return true; // Keep other items
  });
  localStorage.setItem("bagitems", JSON.stringify(BAGITEM));
  loadBagItems();
  displaybag();
  displayBagItems();
  displayBagSummary();
  if (BAGITEM.length > 0) {
    confirmOrderDISP();
  }
}
function generatenewHTML(item) {
  return ` <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.itemImg}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.companyName}</div>
              <div class="item-name">${item.itemName}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.price.currentPrice}</span>
                <span class="original-price">Rs ${item.price.originalPrice}</span>
                <span class="discount-percentage">(${item.price.Discount}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.returnPeriod} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.deliveryDate}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeITEM(${item.id})"> <img src="../images/cross.svg"></div>
          </div>`;
}

function onLoad() {
  loadBagItems();
  displayBagItems();
  displayBagSummary();
  confirmOrderDISP();
}

onLoad();
