import HistoryHeader from "./HistoryHeader";
import HistoryList from "./HistoryList";
import { TabData } from "../../types/tabData";

interface HistoryGroupsProps {
  historyGroup: { [key: string]: TabData };
  timeStamp: string;
}

export default function HistoryGroups(props: HistoryGroupsProps) {
  return (
    <>
      <HistoryHeader tabsData={props.historyGroup} timeStamp={props.timeStamp} />
      <HistoryList tabsData={props.historyGroup} />
    </>
  );
}
