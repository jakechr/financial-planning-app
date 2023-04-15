import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
const GoalsDashboard = Loadable(lazy(() => import('app/views/dashboard/Goals')));
const IncomeDashboard = Loadable(lazy(() => import('app/views/dashboard/Income')));
const ExpensesDashboard = Loadable(lazy(() => import('app/views/dashboard/Expenses')));
const AnalysisDashboard = Loadable(lazy(() => import('app/views/dashboard/Analysis')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      {
        path: '/dashboard/goals',
        element: <GoalsDashboard />,
        auth: authRoles.admin
      },
      {
        path: '/dashboard/income',
        element: <IncomeDashboard />,
        auth: authRoles.admin
      },
      {
        path: '/dashboard/expenses',
        element: <ExpensesDashboard />,
        auth: authRoles.admin
      },
      {
        path: '/dashboard/analysis',
        element: <AnalysisDashboard />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/analysis" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
