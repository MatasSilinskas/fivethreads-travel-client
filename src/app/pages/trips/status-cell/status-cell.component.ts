import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

const statuses = {
  'In planning process': 'Planning',
  'Planned': 'Planned',
  'Happend': 'Organizer'
};

@Component({
  selector: 'app-status-cell',
  templateUrl: './status-cell.component.html',
  styleUrls: ['./status-cell.component.scss']
})
export class StatusCellComponent implements OnInit, ViewCell {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    if (Array.isArray(this.value)) {
      this.renderValue = this.value
        .map(status => statuses[status])
        .join(', ');
    }
  }
}
