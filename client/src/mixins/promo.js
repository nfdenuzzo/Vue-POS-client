import uniqBy from "lodash/uniqBy";
export default {
  methods: {
    async applyPromo() {
      let simplifiedItems = [];
      await this.showItemsInOrder.forEach(async item => {
        for (var i = 0; i < item.quantity; i++) {
          simplifiedItems.push({
            itemId: item.id,
            itemName: item.name,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            price: item.price
          });
        }
      });
      let promoDiscounts = [];
      let promo = this.$store.getters.getCurrentCampaignSpecials;
      if (promo && promo.length > 0) {
        await promo.forEach(async element => {
          let discountItems = { type: "", promoName: "", items: [] };
          let repeatLoop = true;
          let queryItemsObj = await JSON.parse(JSON.stringify(simplifiedItems));
          queryItemsObj.sort(function(a, b) {
            return a["categoryId"] - b["categoryId"] || a["price"] - b["price"];
          });
          do {
            let count = [];
            // lets see how many "conditons" we need to satisfy
            if (element.buyCategories.length > 0) {
              let validIndex = [];
              let uniqueCategories = uniqBy(element.buyCategories, function(e) {
                return e._id;
              });
              await uniqueCategories.forEach(async cat => {
                await queryItemsObj.forEach(async (qObj, index) => {
                  if (cat._id === qObj.categoryId) {
                    validIndex.push(index);
                  }
                });
              });

              if (validIndex.length >= element.buyCategories.length) {
                count.push({ index: 0, value: true });
                validIndex.sort().length = element.buyCategories.length;
              }

              validIndex
                .sort()
                .reverse()
                .forEach(i => {
                  queryItemsObj.splice(i, 1);
                });
            } else if (element.buyCategories.length === 0) {
              count.push({ index: 0, value: true });
            }
            ///////////////////////////////////

            if (element.buyItems.length > 0) {
              let validIndex = [];
              let uniqueItems = await uniqBy(element.buyItems, function(e) {
                return e._id;
              });
              await uniqueItems.forEach(async item => {
                await queryItemsObj.forEach(async (qObj, index) => {
                  if (item._id === qObj.itemId) {
                    validIndex.push(index);
                  }
                });
              });
              if (validIndex.length >= element.buyItems.length) {
                count.push({ index: 1, value: true });
                validIndex = validIndex.sort().slice(element.buyItems.length);
              }

              validIndex
                .sort()
                .reverse()
                .forEach(i => {
                  queryItemsObj.splice(i, 1);
                });
            } else if (element.buyItems.length === 0) {
              count.push({ index: 1, value: true });
            }
            // /////////////////////////////////
            if (element.getCategories.length > 0 && count.length === 2) {
              let validIndex = [];
              let uniqueCategories = uniqBy(element.getCategories, function(e) {
                return e._id;
              });
              await uniqueCategories.forEach(async cat => {
                await queryItemsObj.forEach(async (qObj, index) => {
                  if (cat._id === qObj.categoryId) {
                    validIndex.push(index);
                  }
                });
              });

              if (validIndex.length >= element.getCategories.length) {
                count.push({ index: 2, value: true });
                validIndex.sort().length = element.getCategories.length;
              }
              validIndex.sort().forEach(i => {
                discountItems.items.push(queryItemsObj[i]);
              });
              validIndex.sort().forEach(i => {
                queryItemsObj.splice(i, 1);
              });
            } else if (element.getCategories.length === 0) {
              count.push({ index: 2, value: true });
            }
            // //////////////////////////////////////////////////////
            // in order to get items free/half price we need to ensure that  all the previous checks have been made
            if (element.getItems.length > 0 && count.length === 3) {
              let validIndex = [];
              let uniqueItems = uniqBy(element.getItems, function(e) {
                return e._id;
              });
              await uniqueItems.forEach(async item => {
                await queryItemsObj.forEach(async (qObj, index) => {
                  if (item._id === qObj.itemId) {
                    validIndex.push(index);
                  }
                });
              });
              if (validIndex.length >= element.getItems.length) {
                count.push({ index: 3, value: true });
                validIndex = validIndex.sort().slice(element.getItems.length);
              }
              validIndex.sort().forEach(i => {
                discountItems.items.push(queryItemsObj[i]);
              });
              validIndex.sort().forEach(i => {
                queryItemsObj.splice(i, 1);
              });
            } else if (element.getItems.length === 0) {
              count.push({ index: 3, value: true });
            }

            if (count.length === 4) {
              repeatLoop = true;
            } else {
              repeatLoop = false;
            }
            count = null;
          } while (repeatLoop);
          //    check if discount items is valid for currentt promo then we need tot add the promo name
          if (discountItems.items && discountItems.items.length > 0) {
            discountItems.promoName = element.name;
            discountItems.type = element.type;

            promoDiscounts.push(discountItems);
          }
        });
        return promoDiscounts;
      } else {
        return promoDiscounts;
      }
    },
    applyApplicablePromos() {
      this.totalPromoDiscounts = [];
      this.simplifiedDiscountPromo = [];
      this.totalPromoDiscounts = 0;
      if (
        this.getDiscountedPromoItems &&
        this.getDiscountedPromoItems.length > 0
      ) {
        for (let i = 0; i < this.getDiscountedPromoItems.length; i++) {
          let discountPrice = 0;
          for (
            let k = 0;
            k < this.getDiscountedPromoItems[i].items.length;
            k++
          ) {
            discountPrice =
              discountPrice + this.getDiscountedPromoItems[i].items[k].price;
            if (this.getDiscountedPromoItems[i].type === "HP01") {
              discountPrice = discountPrice / 2;
            }
          }
          this.simplifiedDiscountPromo.push({
            name: this.getDiscountedPromoItems[i].promoName,
            discountPrice: discountPrice
          });
          this.totalPromoDiscounts = this.totalPromoDiscounts + discountPrice;
        }
      }
    }
  }
};
