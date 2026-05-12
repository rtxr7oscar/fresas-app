import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { OrderComponent } from './components/order/order';
import { MenuComponent } from './components/menu/menu';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', redirectTo: '' }
];