import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersComponent } from './users/users.component';
import { ApartamentsComponent } from './apartaments/apartaments.component';
import { TripsComponent } from './trips/trips.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RoleCellComponent } from './users/role-cell/role-cell.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  UsersComponent,
  ApartamentsComponent,
  TripsComponent,
  RoleCellComponent,
];

const ENTRY_COMPONENT = [
  RoleCellComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENT,
  ]
})
export class PagesModule {
}
