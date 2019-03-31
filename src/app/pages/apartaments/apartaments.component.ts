import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApartamentService } from 'src/app/@core/apartament.service';
import { Apartament } from 'src/app/@core/abstractions/apartament';

@Component({
  selector: 'app-apartaments',
  templateUrl: './apartaments.component.html',
  styleUrls: ['./apartaments.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ApartamentsComponent implements OnInit {

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
        title: 'Name',
        type: 'string',
      },
      office: {
        title: 'Office',
        type: 'string',
      },
      adress: {
        title: 'Adress',
        type: 'string',
      },
      places: {
        title: 'Number of places',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private apartamentService: ApartamentService) {
  }

  ngOnInit() {
    this.apartamentService.getAll().subscribe((data: Apartament[]) => {
      this.source.load(data);

      this.source.onAdded().subscribe((row) => {
        const apartamentToCreate = new Apartament();
        apartamentToCreate.name = row.name;
        apartamentToCreate.office = row.office;
        apartamentToCreate.adress = row.adress;
        apartamentToCreate.places = row.places;
   
        // todo: add password field
        this.apartamentService.create(apartamentToCreate, 'test123').subscribe();
      });

      this.source.onUpdated().subscribe((row) => {
        const apartamentToUpdate = new Apartament();
        apartamentToUpdate.name = row.name;
        apartamentToUpdate.office = row.office;
        apartamentToUpdate.adress = row.adress;
        apartamentToUpdate.places = row.places;
        apartamentToUpdate.id = row.id;

        // todo: add password field
        this.apartamentService.update(apartamentToUpdate).subscribe();
      });

      this.source.onRemoved().subscribe((row) => {
        const id = row.id;

        // todo: add password field
        this.apartamentService.delete(id).subscribe();
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
}

