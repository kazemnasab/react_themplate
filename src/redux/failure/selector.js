import { createSelector } from 'reselect'


const selectSearch = (state, search) => search;
const selectItems = (state) => state.failures.items;

export const selectItemsSearch = createSelector(
    [selectItems, selectSearch],
    (items, search) => {
        return items.filter(function (item) {
            return item.name.toLowerCase().includes(search.toLowerCase())
            || item.nameEn.toLowerCase().includes(search.toLowerCase());
        });
    }
);
