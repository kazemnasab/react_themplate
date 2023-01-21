import { createSelector } from "reselect";

const selectTarget = (s, targets) => targets.map(m => m.toLowerCase());
const selectSearch = (s, ss, search) => search;
const selectItems = (state) => state.profiles.items;

export const selectItemsSearch = createSelector(
  [selectItems, selectTarget, selectSearch],
  (items, targets, search) => {
    //console.log(targets);
    if (!search || search == "") search = (m) => true;
    if (targets.length == 0) return items;
    var res = items.filter(function (item) {
      return targets.includes(item.target.toLowerCase());
    });
    res = res.filter(search);
    return res;
  }
);
