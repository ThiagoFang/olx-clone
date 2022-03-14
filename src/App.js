import React from 'react';
import { connect } from 'react-redux';
import { MainRoutes } from './MainRoutes';
import './App.css'

import { Template } from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

const App = () => {
  return(
      <div>
        <Template>
          <Header />
          <MainRoutes />
          <Footer />
        </Template>   
      </div>
  )
}

const mapStateToPRops = (state) => {
  return{
    use:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return{

  };
};

export default connect(mapStateToPRops, mapDispatchToProps) (App)