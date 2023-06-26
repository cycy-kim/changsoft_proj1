import React, { useState, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import "./../styles/NavigationLayout.scss";
import LogoImg from "./../resource/changSoft_logo.png";

interface MenuItem {
  text: string;
  selected: boolean;
  route: string;
  icon: string;
}

export const items: MenuItem[] = [
  {
    text: "Building Hub",
    selected: false,
    route: "/",
    icon: "home",
  },
  {
    text: "Projects",
    selected: false,
    route: "/projects",
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
      return selected === "Projects" ? "Projects" : "Building Hub";
    }
  };

  return (
    <div>
      <div
        className="custom-toolbar"
        style={{ backgroundColor: "rgb(84, 76, 216)" }}
      >
        <div>
          <Button
            icon="menu"
            onClick={handleClick}
            className="menu-button"
            style={{ color: "grey", backgroundColor: "white" }}
          />

          <span
            className={selected === "Projects" ? "selected-text" : ""}
            style={{ color: "white" }}
          >
            {renderSelectedText()}
          </span>
        </div>

        <div className="logo">
          {<img alt="LogoImg" src={LogoImg} height="50px" />}
        </div>
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
