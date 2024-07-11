import { Component, Output, EventEmitter,OnInit } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() sort = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();

  sortImages(criteria: string) {
    this.sort.emit(criteria);
  }

  filterImages(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.filter.emit(inputElement.value);
    }
  }

}
