import { createSelector } from 'reselect'


const selectTarget = (s, target) => target;
const selectSearch = (s,ss, search) => search;
const selectItems = (state) => state.products.items;
const productCategories = (state) => state.productCategories.items;

export const selectItemsSearch = createSelector(
    [selectItems, productCategories, selectTarget, selectSearch],
    (items, categories, target, search) => {
        return items.filter(function (item) {
            return (item.target==target || target == '') && (item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase()));
        }).map(function(item){
            var parrent = categories.find(m=>m.id == item.categoryId);
            if(parrent!=null)
                parrent=parrent.name;
            return {...item,category:parrent}
        });
    }
)

const selectCategories = (s,subcategories) => subcategories;
export const selectItemsForFactor = createSelector(
    [selectItems, productCategories, selectCategories],
    (items, categories, subcategories) => {
        const selected_categories = categories.filter(m=> subcategories.includes(m.name)).map(item=> {return item.id;});
        const res1 = items.filter(m=> selected_categories.includes(m.categoryId));
        return res1;
    }
)
