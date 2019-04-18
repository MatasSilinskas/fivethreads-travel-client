import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from 'src/app/@core/user.service';
import { User } from 'src/app/@core/abstractions/user';
import { MultiselectComponent } from 'src/app/@theme/components/multiselect/multiselect.component';
import { RoleCellComponent } from './role-cell/role-cell.component';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersComponent implements OnInit {

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
      firstname: {
        title: 'First Name',
        type: 'string',
      },
      lastname: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      role: {
        title: 'Roles',
        type: 'custom',
        renderComponent: RoleCellComponent,
        editor: {
          type: 'custom',
          config: {
            list: [
              {
                value: 'ROLE_USER', title: 'User'
              },
              {
                value: 'ROLE_ADMIN', title: 'Admin'
              },
              {
                value: 'ROLE_ORGANIZER', title: 'Organizer'
              }],
          },
          // valuePrepareFunction: (cell, row) => cell,
          component: MultiselectComponent,
        },
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private userService: UserService, private toaster: NbToastrService) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.source.load(data);

      this.source.onAdded().subscribe((row) => {
        const userToCreate = new User();
        userToCreate.firstname = row.firstname;
        userToCreate.lastname = row.lastname;
        userToCreate.phone = row.phone;
        userToCreate.email = row.email;
        userToCreate.role = row.role;
        // todo: add password field
        this.userService.create(userToCreate, 'Test123').subscribe(
          (res) => {
            this.toaster.success(res, 'Success');
          },
          (err) => {
            this.source.remove(row);
            this.toaster.danger('An error occured', 'Error');
        });
      });

      this.source.onUpdated().subscribe((row) => {
        const userToUpdate = new User();
        userToUpdate.firstname = row.firstname;
        userToUpdate.lastname = row.lastname;
        userToUpdate.phone = row.phone;
        userToUpdate.email = row.email;
        userToUpdate.role = row.role;
        userToUpdate.id = row.id;

        this.userService.update(userToUpdate).subscribe(
          (res) => {
            this.toaster.success(res, 'Success');
          },
          (err) => {
            this.toaster.danger('An error occured', 'Error');
          });
      });

      this.source.onRemoved().subscribe((row) => {
        const id = row.id;

        // todo: add password field
        this.userService.delete(id).subscribe();
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

