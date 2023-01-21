import { createSelector } from 'reselect'


const selectSearch = (state, search) => search;
const selectParrent = (s,ss, parrent) => parrent;
const selectItems = (state) => state.productCategories.items;

export const selectItemsSearch = createSelector(
    [selectItems, selectSearch, selectParrent],
    (items, search, parrent) => {
        //console.log(search);
        return items.filter(function (item) {
            if(parrent >= 0)
                return item.name.toLowerCase().includes(search.toLowerCase())
                && item.parrentId == parrent;
            return item.name.toLowerCase().includes(search.toLowerCase());
        }).map(function(item){
            var parrent = items.find(m=>m.id == item.parrentId);
            if(parrent!=null)
                parrent=parrent.name;
            return {...item,category:parrent}
        });
    }
);
