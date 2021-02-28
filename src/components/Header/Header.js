import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Header.css";
import { Button } from "antd";
import { ArrowDownOutlined } from '@ant-design/icons'

const Header = () => {
  return (
    <header>
      <div className="my-container">
        <nav id="navbar">
          <h1 className="brand">
            <span>Saro</span>Invest
          </h1>
          <ul>
            <li>
              <a href="#" className="active">Home</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <section id="showcase">
          <h1>Let's invest</h1>
          <p style={{ textAlign: 'center' }}>Just make investment and earn passive income every day to realize your dream.<br />More company give you this opportunity</p>
        </section>
      </div>
    </header>
  );
};

export default Header;
