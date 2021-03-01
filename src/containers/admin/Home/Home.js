import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { UserOutlined, GlobalOutlined } from '@ant-design/icons'
import * as actions from "../../../store/actions/index";

import './Home.css' 

const Home = props => {
  const users = useSelector(state => state.user.users);
  const sites = useSelector(state => state.site.sites);
  const loadingUser = useSelector(state => state.user.loading)
  const loadingSite = useSelector(state => state.site.loading)
  const dispatch = useDispatch();

  const userColumns = [
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
  
  const siteColumns = [
    {
      title: "Name",
      key: "Name",
      dataIndex: "name",
    },
    {
      title: "Minimum deposit ($)",
      key: "minimumInvest",
      dataIndex: "minimumInvest"
    },
    {
      title: "Contrat",
      key: "contrat",
      dataIndex: "contrat"
    },
    {
      title: "Date de debut",
      key: "createdAt",
      dataIndex: "createdAt"
    }
  ];

  useEffect(() => {
    dispatch(actions.fetchUser());
    dispatch(actions.fetchSite())
  }, [dispatch]);

  const transformedTab = tab => {
    let i = 0,
      result = [];
      console.log('tab length',tab.length)
    for (let item of tab) {
      result.push(item);
      if (i === 4 || i === tab.length - 1 ) return result;
      i++;
    }
  };
  
  
    const transformedSite = transformedTab(sites.reverse());
    const transformedUser = transformedTab(users.reverse());

console.log(transformedSite)
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
              <h3 style={{ color: 'white'}}>{sites.length} Sites</h3>
          </div>
          </div>
      </section>
      <section id="section-2">
        <h3 className="title-dashboard">List of users signed up recently</h3>
        <Table columns={userColumns} rowKey="_id" dataSource={transformedUser} pagination={false}/>
      </section>
      <section id="section-3">
        <h3 className="title-dashboard">List of investment sites saved recently</h3>
        <Table columns={siteColumns} rowKey="_id" dataSource={transformedSite} pagination={false}/>
      </section>
    </div>
  );
};

export default Home;
