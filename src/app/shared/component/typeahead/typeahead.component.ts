import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements AfterViewInit  {
  @Input() typeaheadList: [];
  @Input() debounceValue: number;
  @Input() displayProperty: string;
  @Output() debounceCallback: EventEmitter<string> = new EventEmitter();
  @Output() onSelect: EventEmitter<object> = new EventEmitter();
  @ViewChild('search', {static: false}) searchEle: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    fromEvent(this.searchEle.nativeElement, 'keyup').pipe(debounceTime(this.debounceValue)).subscribe(()=> {
      this.debounceCallback.emit(this.searchEle.nativeElement.value);
    });
  }

  selectedObj(obj: object) {
    this.onSelect.emit(obj);
    this.typeaheadList = [];
    this.searchEle.nativeElement.value = '';
  }

}
