import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TripService } from 'src/app/@core/trip.service';
import { Trip } from 'src/app/@core/abstractions/trip';
import { MultiselectComponent } from 'src/app/@theme/components/multiselect/multiselect.component';
import { StatusCellComponent } from './status-cell/status-cell.component';
import { TripCreationFormComponent } from './tripCreationForm/tripCreationForm.component';
import { NbWindowService } from '@nebular/theme';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class TripsComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'From',
        type: 'string',
      },
      office: {
        title: 'To',
        type: 'string',
      },
      adress: {
        title: 'Apartaments',
        type: 'string',
      },
      places: {
        title: 'Number of people',
        type: 'number',
      },
      organizer: {
        title: 'Organizer',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusCellComponent,
        editor: {
          type: 'custom',
          config: {
            list: [
              {
                value: 'In planning process', title: 'Planning'
              },
              {
                value: 'Planned', title: 'Planned'
              },
              {
                value: 'Happend', title: 'Happend'
              }],
          },
          component: MultiselectComponent,
        },
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private tripService: TripService, private windowService: NbWindowService) {
  }

  ngOnInit() {
    this.tripService.getAll().subscribe((data: Trip[]) => {
      this.source.load(data);

      this.source.onAdded().subscribe((row) => {
        const tripToCreate = new Trip();
        tripToCreate.id = row.id;
        tripToCreate.from = row.from;
        tripToCreate.to = row.to;
        tripToCreate.accommodation = row.accommodation;
        tripToCreate.persons = row.persons;
        tripToCreate.organizer = row.organizer;
        tripToCreate.status = row.status;
   
        // todo: add password field
        this.tripService.create(tripToCreate, 'test123').subscribe();
      });

      this.source.onUpdated().subscribe((row) => {
        const tripToUpdate = new Trip();
       
        tripToUpdate.id = row.id;
        tripToUpdate.from = row.from;
        tripToUpdate.to = row.to;
        tripToUpdate.accommodation = row.accommodation;
        tripToUpdate.persons = row.persons;
        tripToUpdate.organizer = row.organizer;
        tripToUpdate.status = row.status;

        // todo: add password field
        this.tripService.update(tripToUpdate).subscribe();
      });

      this.source.onRemoved().subscribe((row) => {
        const id = row.id;

        // todo: add password field
        this.tripService.delete(id).subscribe();
      });
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to save changes?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  openWindowForm() {
    this.windowService.open(TripCreationFormComponent, { title: `Create Trip` });
  }

}

