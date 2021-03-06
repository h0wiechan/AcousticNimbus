import React from "react";
import { Switch } from "react-router-dom";
import HeaderBar from "./common_components/header_bar";
import SplashPage from "./splash_page/splash_page";
import Homepage from "./homepage/homepage";
import SongsMgmtPage from "./songs_mgmt_page/songs_mgmt_page";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SongShowPage from "./song_show_page/song_show_page";
import UserShowPage from "./user_show_page/user_show_page";
import PlayerBar from "./common_components/player_bar/player_bar";
import QueueList from "./common_components/player_bar/queue_list/queue_list";

const App = () => {
  return (
    <div className="app">
      <div className="page-container">
        <HeaderBar />
        <Switch>
          <AuthRoute exact path="/" component={SplashPage} />
          <ProtectedRoute path="/charts/top" component={Homepage} />
          <ProtectedRoute path="/stream" component={Homepage} />
          <ProtectedRoute path="/upload" component={SongsMgmtPage} />
          <ProtectedRoute path="/you/songs" component={SongsMgmtPage} />
          <ProtectedRoute exact path="/songs/:songId" component={SongShowPage} />
          <ProtectedRoute exact path="/users/:userId" component={UserShowPage} />
        </Switch>
      </div>
      <QueueList />
      <PlayerBar />
    </div>
  );
};

export default App;