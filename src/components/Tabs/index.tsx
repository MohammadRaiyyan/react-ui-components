import React, {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type Dispatch,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

interface TabsContextProps {
  selectedTabId: string;
  setSelectedTabId: Dispatch<React.SetStateAction<string>>;
  tabName: string;
}

const TabsContext = createContext<TabsContextProps | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
}
interface TabsProps {
  children: React.ReactNode;
  activeTabId: string;
}
function Tabs({ children, activeTabId }: TabsProps) {
  const [selectedTabId, setSelectedTabId] = useState(activeTabId);
  const tabName = crypto.randomUUID().split("-")[0];
  const value = {
    selectedTabId,
    setSelectedTabId,
    tabName,
  } satisfies TabsContextProps;

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}
interface TabListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "ref" | "role"> {
  children: React.ReactNode;
}
function TabList({ children, ...restProps }: TabListProps) {
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = tabListRef.current?.querySelectorAll<HTMLElement>(
      "[role='tab']:not([aria-disabled='true'])",
    );
    if (!tabs || tabs.length === 0) return;
    const currentIndex = Array.from<HTMLElement>(tabs).indexOf(
      document.activeElement as HTMLElement,
    );

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp": {
        const next = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        tabs[next].focus();
        e.preventDefault();
        break;
      }
      case "ArrowRight":
      case "ArrowDown": {
        const next = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        tabs[next].focus();
        e.preventDefault();
        break;
      }
    }

    restProps.onKeyDown?.(e);
  };
  return (
    <div
      ref={tabListRef}
      role="tablist"
      {...restProps}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

interface TabProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "role" | "aria-selected" | "aria-controls" | "tabIndex"
  > {
  children: ReactNode;
  value: string;
}

function Tab({ children, value, onClick, ...restProps }: TabProps) {
  const { setSelectedTabId, selectedTabId, tabName } = useTabsContext();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedTabId(value);
    onClick?.(e);
  };

  const isActive = selectedTabId === value;

  return (
    <button
      {...restProps}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-${tabName}-panel-${value}`}
      aria-disabled={restProps.disabled ? true : undefined}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tabId: string;
}
function TabPanel({ children, tabId, ...restProps }: TabPanelProps) {
  const { selectedTabId, tabName } = useTabsContext();

  if (selectedTabId !== tabId) {
    return null;
  }
  return (
    <div
      {...restProps}
      role="tabpanel"
      tabIndex={0}
      id={`tab-${tabName}-panel-${tabId}`}
    >
      {children}
    </div>
  );
}

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
