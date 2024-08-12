let bagItemsObjects;
let item;
onload();
function onload() {
  loadBagItems();
  displayBagItems();
  displayBagSummary();
}
function removeItemLoad() {
  loadBagItems();
  displayBagItemsCount();
  displayBagItems();
  displayBagSummary();
}
function loadBagItems() {
  bagItemsObjects = bagItems.map((itemid) => {
    for (i = 0; i < items.length; i++) {
      if (itemid == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";

  bagItemsObjects.forEach((bagItem) => {
    innerHTML += generateHtmlItem(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}
function removeItem(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  removeItemLoad();
}

function generateHtmlItem(item) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.item_image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.Company_Name}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.Original_Price}</span>
        <span class="discount-percentage">(${item.Discount_Percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart "onclick="removeItem(${item.id})">X</div>
  </div>`;
}

function displayBagSummary(){
  let bagSummaryElement=document.querySelector('.bag-summary');
  let totalItem=bagItems.length;
  let Total_MRP=0;
  let Discount=0;
  let Convenience=0;
 
  let Total_Amount=0;
  bagItemsObjects.forEach(bagItem=>{
    Total_MRP+=bagItem.Original_Price;
    Discount+=bagItem.Original_Price-bagItem.current_price;


  })
  if(Total_MRP>0){
    Convenience=99;
  }else Convenience=0;
  Total_Amount=Total_MRP-Discount+Convenience;
  bagSummaryElement.innerHTML=` <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
        <div class="price-item">
          <span class="price-item-tag">Total MRP</span>
          <span class="price-item-value">Rs${Total_MRP}</span>
        </div>
        <div class="price-item">
          <span class="price-item-tag">Discount on MRP</span>
          <span class="price-item-value priceDetail-base-discount">-Rs${Discount}</span>
        </div>
        <div class="price-item">
          <span class="price-item-tag">Convenience Fee</span>
          <span class="price-item-value">Rs ${Convenience}</span>
        </div>
        <hr>
        <div class="price-footer">
          <span class="price-item-tag">Total Amount</span>
          <span class="price-item-value">Rs ${Total_Amount}</span>
        </div>
      </div>
      <button class="btn-place-order">
        <div class="css-xjhrni">PLACE ORDER</div>
      </button>`
}