let bagItems;
let wishItems = [];
onLoad();
function onLoad() {
  bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  displayItems();
  displayBagItemsCount();
}

function addToWishList(itemID) {
  wishItems.push(itemID);
  localStorage.setItem("wishItems", JSON.stringify(wishItems));
  // displayBagItemsCount();
}
function addToBag(itemID) {
  bagItems.push(itemID);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagItemsCount();
}
function displayBagItemsCount() {
  let countElement = document.querySelector(".Items-Count");
  if (bagItems.length > 0) {
    countElement.style.visibility = "visible";
    countElement.innerText = bagItems.length;
  } else {
    countElement.style.visibility = "hidden";
  }
}
function displayItems() {
  let item_containerElement = document.querySelector(".items_Container");
  if (!item_containerElement) {
    return;
  }
  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += ` <div class="Product_Container">
            <img src="../${item.item_image}" alt="ProductImage" class="images">
            <div class="Rating">
              ${item.rating.stars} ⭐| ${item.rating.count}
            </div>
            <div class="companyName">
              ${item.Company_Name}
            </div>
            <div class="item-name">${item.item_name}</div>
            <div class="Price">
              <span class="Current-Price">${item.current_price} Rs</span>
              <span class="Original-Price">${item.Original_Price} Rs</span>
              <span class="Discount">(${item.Discount_Percentage}%)</span>
            </div>
            <div class="btn-container">
            <button id="addToCart" class="btn" onclick="addToBag(${item.id})">Add To Bag</button>
            <Button id="Wishlist" class="btn" onclick="addToWishList(${item.id})">❤️WishList</Button>
          </div>
          </div>`;
  });

  item_containerElement.innerHTML = innerHtml;
}
