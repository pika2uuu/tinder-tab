import HistoryHeader from "./HistoryHeader";
import HistoryList from "./HistoryList";
import { TabData } from "../../types/tabData";

interface HistoryGroupsProps {
  historyGroup: { [key: string]: TabData };
}

export default function HistoryGroups(props: HistoryGroupsProps) {
  return (
    <>
      <HistoryHeader tabsData={props.historyGroup} />
      <HistoryList tabsData={props.historyGroup} />
    </>
  );
}
