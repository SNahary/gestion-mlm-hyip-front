import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { UserOutlined, GlobalOutlined } from '@ant-design/icons'
import * as actions from "../../../store/actions/index";

import './Home.css' 

const Home = props => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Name",
      key: "Name",
      dataIndex: "name",
      width: 100
    },
    {
      title: "Email",
      key: "Email",
      dataIndex: "email",
      width: 100
    }
  ];

  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  const transformedTab = tab => {
    let i = 0,
      result = [];
    for (let item of tab) {
      if (i === 5 || i > tab.length) return result;
      result.push(item);
      i++;
    }
  };

  const transformedUser = transformedTab(users.reverse());
  return (
    <div>
      <section id="section-1">
        <div className="nb-container">
          <div className="dashboard-card" style={{ backgroundColor: 'midnightblue'}}>
              <UserOutlined style={{ fontSize: '25px', color: 'white' }} />
              <h3 style={{ color: 'white'}}>{users.length} Users</h3>
          </div>
          <div className="dashboard-card" style={{ backgroundColor: 'darkviolet'}}>
              <GlobalOutlined style={{ fontSize: '25px', color: 'white' }} />
              <h3 style={{ color: 'white'}}>0 Sites</h3>
          </div>
          </div>
      </section>
      <section id="section-2">
        <h3>List of users signed up recently</h3>
        <Table columns={columns} rowKey="_id" dataSource={transformedUser} pagination={false}/>
      </section>
    </div>
  );
};

export default Home;
