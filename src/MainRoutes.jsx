import React from "react";
import { useRoutes } from "react-router-dom";
import RequireAuth from './helpers/RequireAuth'

import { Home } from './pages/Home/Home'
import { NotFound } from './pages/NotFound'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { AdPage } from './pages/AdPage'
import { AddAd } from './pages/AddAd'
import { Ads } from './pages/Ads'

export const MainRoutes = () => {
    return useRoutes ([
        {path: '/', element: <Home />},
        {path: '/signin', element: <SignIn />},
        {path: '/signup', element: <SignUp />},
        {path: '/ad/:id', element: <AdPage />},
        {path: '/post-an-ad', element: <RequireAuth private><AddAd /></RequireAuth>},
        {path: '/ads', element: <Ads />},
        {path: '*', element: <NotFound />}
    ]);
}