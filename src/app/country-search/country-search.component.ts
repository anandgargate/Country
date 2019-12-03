import { Component } from '@angular/core';
import { SearchService } from '../shared/service/search.service';
import { CountryName, CoutryDetails } from '../models/country.model'


@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
  providers: [ SearchService ]
})
export class CountrySearchComponent {
  countryList: CoutryDetails[] = [];
  typeAheadList: CountryName[] = [];
  compareObj: object = {};
  isError: boolean = false;

  constructor(private _searchService: SearchService) { }

  searchCountry(query: string, moreFields?: boolean) {
    this._searchService.getCountryList(query, moreFields).subscribe((countryList: any) => {
      this.isError = false;
      if (moreFields) {
        this._filterCountryList(countryList);
      } else {
        this.typeAheadList = countryList
      }
    }, error => {
      this.isError = true;
    })
  }

  selectionCallback(event: object) {
    this.searchCountry(event['name'], true);
  }

  addToCompare(obj: CoutryDetails) {
    obj.isCompare = !obj.isCompare;
    if(obj.isCompare) {
      this.compareObj[obj.alpha2Code] = obj;
    } else {
      delete this.compareObj[obj.alpha2Code];
    }
  }

  clearList() {
    this.compareObj = {};
    this.countryList = [];
  }

  _filterCountryList(countryList: CoutryDetails[]) {
    this.countryList = Object.values(this.compareObj);
    if(this.countryList.length) {
      countryList.forEach(element => {
        if(!this.compareObj[element.alpha2Code]) {
          this.countryList.push(element);
        }
      });
    } else {
      this.countryList = countryList;
    }
  }




}
