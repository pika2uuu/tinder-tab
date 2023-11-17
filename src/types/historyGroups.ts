import { TabData } from "./tabData";

export interface HistoryGroups {
  [key: string]: { [key: string]: TabData };
}
