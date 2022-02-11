import { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import loadlogo from './assets/images/logo1.png';
import {  AsyncAppLayout,  AsyncSettings, AsyncRequestorReport, AsyncTestTypeReport, AsyncReferReport, AsyncCareLab, AsyncRequestorSalesReport, AsyncDailySummary, AsyncDailyTransaction, AsyncLogin, AsyncPublicLayout, AsyncNotFound, AsyncFinance, AsyncTheme, AsyncOutSourcing, AsyncEditBill, AsycAboutLuniva } from './App/asyncComponent';
import PublicRoute from './Routes/PublicRoute';
import { MenuSettings } from './Data/MenuSettings';
import PrivateRouter from './Routes/PrivateRouter';
import { createGlobalStyle } from 'styled-components'
import { themedata } from './Components/theme/themdata';
import { io } from "socket.io-client";


function App() {
  useEffect(() => {
    localStorage.clear()
    localStorage.setItem('theme', JSON.stringify(themedata.theme3));

    return () => {
    };
  }, []);


  // useEffect(()=> {
  //   localStorage.clear()
  //   localStorage.setItem('theme', JSON.stringify(themedata.theme3));
  // }, [])
  const theme = JSON.parse(localStorage.getItem('theme'));
  const Potato = createGlobalStyle`
  :root {
  --primary: ${theme?.primary ? theme?.primary : '#026b9e'};
  --secondary: ${theme?.secondary ? theme?.secondary : '#3ea9dbf2'}; 
  --primaryBackground:${theme?.primaryBackground ? theme?.primaryBackground : '#d0edff'};
  --secondaryBackground: #fefefe;
  --cardColor: #fefefe;
  --titleTxt: #232342;
  }
`
  // const [user, setUser] = useState("");
  // const socket= io("http://anisdell:3006/", {
  //     path: "/hello-path/"
  //   });


  //   useEffect(() => {
  //     socket.emit("newUser", 'anib');
  //   }, [socket]);

  //   useEffect(() => {
  //     if(socket !== null){
  //       socket.on("updateNotification", (data) => {
  //         console.log(data);
  //     });

  //     onClickEvent()

  //     }
  // }, [socket]);

  // const onClickEvent = () => {
  //   socket.emit("sendNotification", {
  //       senderName: user,
  //       receiverName: user
  //     });
  // }


  return (

    <>
      <Potato />
      <Suspense
        fallback={
          <div className='fallback-container'>
            <img src={loadlogo} alt="" />
          </div>
        }
      >
        <Switch>

          <Route exact path="/">
            <Redirect to="/dashbord" />
          </Route>

          <PublicRoute
            exact
            path='/login'
            component={AsyncLogin}
            layout={AsyncPublicLayout}
          />

          {
            MenuSettings.finance ? (
              <PrivateRouter
                exact
                path='/dashbord'
                component={AsyncFinance}
                layout={AsyncAppLayout}
                showSider

              />
            ) : ''
          }

          {
            MenuSettings.misreports ? [
              <PrivateRouter
                exact
                key='thisSet/51'
                path='/datametric'
                component={AsyncCareLab}
                layout={AsyncAppLayout}
                showSider
              />,

              <PrivateRouter
                exact
                key='thisSet/52'
                path='/datametric/testtype'
                component={AsyncTestTypeReport}
                layout={AsyncAppLayout}
                showSider
              />,

              <PrivateRouter
                exact
                key='thisSet/53'
                path='/datametric/requestor'
                component={AsyncRequestorReport}
                layout={AsyncAppLayout}
                showSider
              />,

              <PrivateRouter
                exact
                key='thisSet/54'
                path='/datametric/referer'
                component={AsyncReferReport}
                layout={AsyncAppLayout}
                showSider
              />,

              <PrivateRouter
                exact
                key='thisSet/55'
                path='/datametric/requestorsales'
                component={AsyncRequestorSalesReport}
                layout={AsyncAppLayout}
                showSider
              />,

              <PrivateRouter
                exact
                key='thisSet/56'
                path='/datametric/dailysummary'
                component={AsyncDailySummary}
                layout={AsyncAppLayout}
                showSider
              />,

              <PrivateRouter
                exact
                key='thisSet/57'
                path='/datametric/dailytransaction'
                component={AsyncDailyTransaction}
                layout={AsyncAppLayout}
                showSider
              />,

            ] : ''
          }
          {
            MenuSettings.outsourcing ? [
              <PrivateRouter
                exact
                path='/outsourcing'
                component={AsyncOutSourcing}
                layout={AsyncAppLayout}
                showSider
              />

            ] : ''
          }
          {
            MenuSettings.editbill ? [
              <PrivateRouter
                exact
                path='/editbill'
                component={AsyncEditBill}
                layout={AsyncAppLayout}
                showSider
              />

            ] : ''
          }


          <PrivateRouter
            exact
            path='/settings'
            component={AsyncSettings}
            layout={AsyncAppLayout}
            showSider
          />

          <PrivateRouter
            exact
            path='/aboutluniva'
            component={AsycAboutLuniva}
            layout={AsyncAppLayout}
            showSider
          />

          <Route
            component={AsyncNotFound}
          />

        </Switch>
      </Suspense>
    </>
  )
}

export default App;

