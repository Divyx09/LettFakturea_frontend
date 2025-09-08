import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/components/Sidebar.css";

const menuItems = [
  { label: "Invoices", icon: "🧾", active: false },
  { label: "Customers", icon: "🧑‍🤝‍🧑", active: false },
  { label: "My Business", icon: "🏢", active: false },
  { label: "Invoice Journal", icon: "📖", active: false },
  { label: "Price List", icon: "🏷️", active: true },
  { label: "Multiple Invoicing", icon: "📄", active: false },
  { label: "Unpaid Invoices", icon: "❗", active: false },
  { label: "Offer", icon: "🎁", active: false },
  { label: "Inventory Control", icon: "📦", active: false, disabled: true },
  { label: "Member Invoicing", icon: "👥", active: false, disabled: true },
  { label: "Import/Export", icon: "☁️", active: false },
  {
    label: "Log out",
    icon: <FaSignOutAlt style={{ color: "#ff512f" }} />,
    active: false,
  },
];

const Sidebar = () => {
  const handleMenuItemClick = (item, index) => {
    if (item.disabled) return;
    console.log(`Clicked on ${item.label}`);
  };

  return (
    <div className="sidebar">
      <h2 className="menu-title">Menu</h2>
      <div className="menu-underline" />
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${item.disabled ? "disabled" : ""} ${
              item.active ? "active" : ""
            }`}
            onClick={() => handleMenuItemClick(item, index)}
          >
            {item.active && <span className="green-dot" />}
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
