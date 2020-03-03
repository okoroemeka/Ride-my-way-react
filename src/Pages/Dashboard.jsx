/* eslint-disable import/no-cycle */
import React from 'react';
import Dashboard from '../component/dashboardv2';
import Auth from '../component/Authenticator/Auth';

const DashboardWrapper = () => (
  <Auth>
    <Dashboard />
  </Auth>
);

export default DashboardWrapper;
