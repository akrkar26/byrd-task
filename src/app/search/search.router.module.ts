import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: 'search',
    component: SearchPage
  },
  {
    path: 'orders',
    loadChildren: '../orders/orders.module#OrdersPageModule'
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
