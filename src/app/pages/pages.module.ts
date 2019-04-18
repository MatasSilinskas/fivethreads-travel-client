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
import { StatusCellComponent } from './trips/status-cell/status-cell.component';
import { TripCreationFormComponent } from './trips/tripCreationForm/tripCreationForm.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NbDatepickerModule } from '@nebular/theme';
import { AgmCoreModule } from '@agm/core';


const PAGES_COMPONENTS = [
  PagesComponent,
  UsersComponent,
  ApartamentsComponent,
  TripsComponent,
  RoleCellComponent,
  StatusCellComponent,
  TripCreationFormComponent,
];

const ENTRY_COMPONENT = [
  RoleCellComponent,
  StatusCellComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NbDatepickerModule,
    AgmCoreModule,
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
