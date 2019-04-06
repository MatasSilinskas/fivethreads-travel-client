import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

const roles = {
  'ROLE_USER': 'User',
  'ROLE_ADMIN': 'Admin',
  'ROLE_ORGANIZER': 'Organizer'
};

@Component({
  selector: 'app-role-cell',
  templateUrl: './role-cell.component.html',
  styleUrls: ['./role-cell.component.scss']
})
export class RoleCellComponent implements OnInit, ViewCell {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    if (Array.isArray(this.value)) {
      this.renderValue = this.value
        .map(role => roles[role])
        .join(', ');
    }
  }
}
