import { useState } from "react";
import HistoryHeader from "./HistoryHeader";
import HistoryList from "./HistoryList";
import { TabData } from "../../types/tabData";

interface HistoryGroupsProps {
  historyGroup: { [key: string]: TabData };
  timeStamp: string;
  onTabDelete: () => void;
}

export default function HistoryGroups(props: HistoryGroupsProps) {
  const initialTabs = Object.values(props.historyGroup);
  const [tabs, setTabs] = useState<TabData[]>(initialTabs);

  const handleRestoreTabs = () => {
    tabs.forEach((tab) => {
      if (tab.url) {
        chrome.tabs.create({ url: tab.url });
    }
  });
    
  }

  return (
    <>
      {tabs.length > 0 && (
        <>
          <HistoryHeader tabsData={tabs} timeStamp={props.timeStamp} onTabDelete={props.onTabDelete} onRestoreTabs={handleRestoreTabs} />
          <HistoryList tabsData={tabs} setTabs={setTabs} timeStamp={props.timeStamp} onTabDelete={props.onTabDelete} />
        </>
      )}
    </>
  );
}
