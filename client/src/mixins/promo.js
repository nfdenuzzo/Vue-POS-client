import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";
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
      let discountItems = [];
      let promo = this.$store.getters.getCurrentCampaignSpecials;
      if (promo && promo.length > 0) {
        await promo.forEach(async element => {
          let repeatLoop = true;
          let queryItemsObj = await JSON.parse(JSON.stringify(simplifiedItems));
          queryItemsObj = await sortBy(queryItemsObj, async function(item) {
            return item.price;
          }).reverse();
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
            /////////////////////////////////
            queryItemsObj = await sortBy(queryItemsObj, async function(item) {
                return item.price;
            });
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

              validIndex
                .sort()
                .forEach(i => {
                  discountItems.push(queryItemsObj[i]);
                });
              validIndex
                .sort()
                .forEach(i => {
                  queryItemsObj.splice(i, 1);
                });
            } else if (element.getCategories.length === 0) {
              count.push({ index: 2, value: true });
            }
            //////////////////////////////////////////////////////

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

              validIndex
                .sort()
                .forEach(i => {
                  discountItems.push(queryItemsObj[i]);
                });
              validIndex
                .sort()
                .forEach(i => {
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
        });
      }
      return discountItems;
    }
  }
};
