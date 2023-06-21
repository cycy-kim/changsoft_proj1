import React, { useState, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import "./../styles/NavigationLayout.scss";

interface MenuItem {
  text: string;
  selected: boolean;
  route: string;
  icon: string;
}

export const items: MenuItem[] = [
  {
    text: "Home",
    selected: false,
    route: "/",
    icon: "home",
  },
  {
    text: "Buildings",
    selected: false,
    route: "/building_list",
    icon: "k-i-grid",
  },
  {
    text: "User",
    selected: false,
    route: "/user_info",
    icon: "user",
  },
];

export const NavigationLayout = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState("");

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = (e: any) => {
    navigate(e.itemTarget.props.route);
  };

  useEffect(() => {
    const selectedItem = items.find((item) => item.route === location.pathname);
    if (selectedItem) {
      setSelected(selectedItem.text);
    }
  }, [location.pathname]);

  const renderSelectedText = () => {
    if (selected === "User") {
      return "User";
    } else {
      return selected === "Buildings" ? "Buildings" : "Home";
    }
  };

  return (
    <div>
      <div className="custom-toolbar">
        <div className="logo">
          {/* 원하는 로고를 여기에 추가 */}
        </div>

        <Button icon="menu" onClick={handleClick} className="menu-button" />

        <span className={selected === "Buildings" ? "selected-text" : ""}>
          {renderSelectedText()}
        </span>
      </div>

      <div>
        <Drawer
          expanded={expanded}
          position="start"
          mode="push"
          width={240}
          items={items.map((item) => ({
            ...item,
            selected: item.text === selected,
          }))}
          onSelect={onSelect}
          className="drawer"
        >
          <DrawerContent>
            {props.children}
            <Outlet />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};