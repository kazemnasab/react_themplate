import * as React from "react";
import { selectItemsSearch } from "redux/profile/selector";
import { selectItemTarget } from "redux/status/selector";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as Api from "api/core";
import Item from "./Item";
import CustomNoRowsOverlay from "components/common/CustomNoRowsOverlay";


function List({
  sheetId = null,
  onSelectedChange,
  onItemUpdated,
  sheetStates,
  repaireMans,
}) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    if (sheetId)
      Api.api_get("SheetStatus?sheet=" + sheetId).then((res) => {
        setItems(res.data);
      });
  }, [sheetId]);

  React.useEffect(() => {
    if (onItemUpdated) onItemUpdated(items, setItems);
  }, [onItemUpdated]);

  return (
    <>
    {items.length == 0 ? <CustomNoRowsOverlay/> : items.map((item, index) => {
      return (
        <Item
        key={item.id}
          item={item}
          sheetState={sheetStates.find((m) => m.key == item.stateId)}
          repaireMan={repaireMans.find((m) => m.id == item.profileId)}
          onSelectedChange={onSelectedChange}
        />
      );
    })}
  </>
  );
}

const mapStateToProps = (state) => {
  const repaireMans = selectItemsSearch(state, ["RepairMan"], "");
  const sheetStates = selectItemTarget(state, "Sheet15");
  return {
    repaireMans,
    sheetStates,
  };
};

export const Index = injectIntl(connect(mapStateToProps, {})(List));

export const itemUpdated = (prevValue, newValue) => {
  return (items, setItems) => {
    if (!newValue || !items || !setItems) return;
    if (!prevValue) setItems([...items, newValue]);
    else setItems(items.map((item) => (item.id == newValue.id ? newValue : item)));
  };
};
