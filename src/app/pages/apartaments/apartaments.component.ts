import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApartamentService } from 'src/app/@core/apartament.service';
import { Apartament } from 'src/app/@core/abstractions/apartament';
import { OfficeService } from 'src/app/@core/office.service';
import { Office } from 'src/app/@core/abstractions/office';
import { NbToastrService } from '@nebular/theme';

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
  officeLoaded = false;

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
      address: {
        title: 'Address',
        type: 'string',
      },
      officeId: {
        title: 'Office',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private apartamentService: ApartamentService, private officeService: OfficeService, private toaster: NbToastrService) {
  }

  ngOnInit() {
    this.officeService.getAll().subscribe((data) => {
      this.settings.columns.officeId.editor.config.list = data.map(item => {
        return {
          title: item.name,
          value: item.id
        };
      });

      this.officeLoaded = true;
    });

    this.apartamentService.getAll().subscribe((data: Apartament[]) => {
      this.source.load(data);

      this.source.onAdded().subscribe((row) => {
        const apartamentToCreate = new Apartament();
        apartamentToCreate.officeId = row.officeId;
        apartamentToCreate.address = row.address;

        // todo: add password field
        this.apartamentService.create(apartamentToCreate).subscribe(
          (res) => {
            this.toaster.success('Apartments created', 'Success');
          },
          (err) => {
            this.source.remove(row);
            this.toaster.danger('An error occured', 'Error');
          }
        );
      });

      this.source.onUpdated().subscribe((row) => {
        const apartamentToUpdate = new Apartament();
        apartamentToUpdate.officeId = row.officeId;
        apartamentToUpdate.address = row.address;
        apartamentToUpdate.id = row.id;

        // todo: add password field
        this.apartamentService.update(apartamentToUpdate).subscribe(
          (res) => {
            this.toaster.success('Apartments updated', 'Success');
          },
          (err) => {
            this.toaster.danger('An error occured', 'Error');
          }
        );
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

