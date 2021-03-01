import React, { useState } from "react";
import "./Header.css";
import { Button, Drawer } from "antd";
import { BarsOutlined } from "@ant-design/icons";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const toggleDrawer = () => setVisible(visible => !visible);

  return (
    <header>
      <div className="my-container">
        <nav id="navbar">
          <div>
            <h1 className="brand">
              <span>Saro</span>Invest
            </h1>
          </div>
          <ul>
            <li>
              <a href="#" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div className="mobileOnly">
            <Button
              style={{ backgroundColor: "crimson", border: "none" }}
              type="primary"
              icon={<BarsOutlined color="crimson" />}
              onClick={toggleDrawer}
            ></Button>
            <Drawer
              visible={visible}
              placement="right"
              closable={true}
              onClose={toggleDrawer}
            >
              <ul className="menu-mobileOnly">
                <li>
                  <a href="#" className="active" style={{ fontWeight: 500 }}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#contact" style={{ fontWeight: 500 }}>Contact</a>
                </li>
              </ul>
            </Drawer>
          </div>
        </nav>
        <section id="showcase">
          <h1>Let's invest</h1>
          <p style={{ textAlign: "center" }}>
            Just make investment and earn passive income every day to realize
            your dream.
            <br />
            More company give you this opportunity
          </p>
        </section>
      </div>
    </header>
  );
};

export default Header;
