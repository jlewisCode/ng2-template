import { Routes, RouterModule } from '@angular/router';

// import { CanActivateViaAuthGuard } from './services';
import {
  HomeRoute,
  LoginRoute,
  PageNotFoundRoute,
} from './components';


const routes: Routes = [
  {
    path: '',
    component: HomeRoute,
    // canActivate: [ CanActivateViaAuthGuard ],  // auth protection
    // children: [ {path: 'homechild', component: HomeChildRoute} ]
  },
  {
    path: 'login',
    component: LoginRoute,
  },
  {
    path: '**',
    component: PageNotFoundRoute,
    data: { title: 'Page Not Found'},  // because title str should differ from path str
  },
];

export const routing = RouterModule.forRoot(routes);
