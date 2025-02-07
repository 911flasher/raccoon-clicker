import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StoreProvider } from 'core/store/provider';
import { i18next } from 'features/localization';
import { InitError } from 'features/page-layout';
import { SettingsProvider } from 'features/settings';
import { BoostsPage } from 'pages/boosts/page';
import { ClickerPage } from 'pages/clicker/page';
import { DailyRewardPage } from 'pages/daily-reward/page';
import { EarnPage } from 'pages/earn/page';
import { FriendsPage } from 'pages/friends/page';
import { GuildsPage } from 'pages/guilds/page';
import { LeadersPage } from 'pages/leaders/page';
import { MainPage } from 'pages/main/page';
import { MarketPage } from 'pages/market/page';
import { OfflineEarningsPage } from 'pages/offline-earnings/page';
import { PartnersPage } from 'pages/partners/page';
import { PresalePage } from 'pages/presale/page';
import { ProfilePage } from 'pages/profile/page';
import { StartPage } from 'pages/start/page';
import { TasksPage } from 'pages/tasks/page';

import { App } from './app';

import './core/styles/global.css';
import './core/styles/react-modal-sheet.css';


const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <InitError />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/start',
        element: <StartPage />,
      },
      {
        path: '/daily-reward',
        element: <DailyRewardPage />,
      },
      {
        path: '/offline-earnings',
        element: <OfflineEarningsPage />,
      },
      {
        path: '/clicker',
        element: <ClickerPage />,
      },
      {
        path: '/boosts',
        element: <BoostsPage />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
      },
      {
        path: '/leaders',
        element: <LeadersPage />,
      },
      {
        path: '/friends',
        element: <FriendsPage />,
      },
      {
        path: '/earn',
        element: <EarnPage />,
      },
      {
        path: '/partners',
        element: <PartnersPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/guilds',
        element: <GuildsPage />,
      },
      {
        path: '/market',
        element: <MarketPage />,
      },
      {
        path: '/presale',
        element: <PresalePage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      {/* <Stats /> */}
      <I18nextProvider i18n={i18next}>
        <SettingsProvider>
          <RouterProvider router={router} />
        </SettingsProvider>
      </I18nextProvider>
    </StoreProvider>
   
  </React.StrictMode>,
)
