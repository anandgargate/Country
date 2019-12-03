import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const END_POINTS = {
  COUNTRY: {
    API: 'https://restcountries.eu/rest/v2/name/query?fields=name',
    FIELDS: ';alpha2Code;capital;region;timezones'
  }
}

@Injectable()
export class SearchService {

  constructor(private _http: HttpClient) {
  }

  getCountryList(query: string, addFields?: boolean) {
    return this._http.get(END_POINTS.COUNTRY.API.replace('query', query) + (addFields ? END_POINTS.COUNTRY.FIELDS : ''));
  }

}
