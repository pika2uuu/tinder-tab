import { useState } from "react";
import HistoryHeader from "./HistoryHeader";
import HistoryList from "./HistoryList";
import { TabData } from "../../types/tabData";

interface HistoryGroupsProps {
  historyGroup: { [key: string]: TabData };
  timeStamp: string;
}

export default function HistoryGroups(props: HistoryGroupsProps) {
  const initialTabs = Object.values(props.historyGroup);
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);

  return (
    <>
      {tabs.length > 0 && (
        <>
          <HistoryHeader tabsData={tabs} timeStamp={props.timeStamp} />
          <HistoryList tabsData={tabs} setTabs={setTabs} timeStamp={props.timeStamp} />
        </>
      )}
    </>
  );
}
