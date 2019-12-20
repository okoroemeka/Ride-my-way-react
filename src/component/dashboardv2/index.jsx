import React, { Component } from 'react';
import Map from './Mapcontainer';
import Sidebar from './Sidebar';
import Button from '../reusables/Button';
import RidersWrapper from './Riders';
import RidersCard from './RidersCard';
import './dashboardv2.scss';

class Dashbaordv2 extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {  }
  // }
  state = {};

  render() {
    return (
      <>
        <div className="row main__body">
          <div className="col-2 side__bar__container">
            <Sidebar>
              <Button
                buttonClassName="create__ride"
                buttonText="create ride"
                type="button"
              />
              <Button
                buttonClassName="join__ride"
                buttonText="join ride"
                type="button"
              />
            </Sidebar>
          </div>
          <div className="col-7 main__area__coantainer" />
          <div className="col-3 display__rides__container">
            <RidersWrapper>
              <RidersCard
                image="https://via.placeholder.com/150"
                name="emeka okoro"
                phone={`${982000009}`}
                destination="isLand"
                location="Ojota"
              />
              <RidersCard
                image="https://via.placeholder.com/150"
                name="emeka okoro"
                phone={`${982000009}`}
                destination="isLand"
                location="Ojota"
              />
            </RidersWrapper>
          </div>
        </div>
        <div className="row display__rides" />
      </>
    );
  }
}

export default Dashbaordv2;
