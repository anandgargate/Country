import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountrySearchComponent } from './country-search.component';
import { SearchService } from '../shared/service/search.service';
import { TypeaheadComponent } from '../shared/component/typeahead/typeahead.component';
import { of } from 'rxjs';

describe('CountrySearchComponent', () => {
  let component: CountrySearchComponent;
  let fixture: ComponentFixture<CountrySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrySearchComponent, TypeaheadComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('verify searchCountry', ()=> {

    beforeEach(()=> {
      spyOn(component['_searchService'], 'getCountryList').and.callFake(()=> {
        return of([{name: 'India'}]);
      });
    })

    it('should be defined', ()=> {
      expect(component.searchCountry).toBeDefined();
    })

    it('should set typeAheadList when call searchCountry from typeAhead', () => {
      component.searchCountry('india');
      expect(component.typeAheadList).toEqual([{name: 'India'}]);
      expect(component.isError).toBeFalsy();
    });

    it('should call filterCountryList when call searchCountry from selectionCallback', () => {
      expect(component.searchCountry).toBeDefined();
      const filterCountryList = spyOn(component, '_filterCountryList').and.callThrough();
      component.searchCountry('india', true);
      expect(filterCountryList).toHaveBeenCalled();
      expect(component.countryList.length).toEqual(1);
    });
  })

  describe('verify selectionCallback', ()=> {
    it('should be defined', ()=> {
      expect(component.selectionCallback).toBeDefined();
    })

    it('should call selectedCountry method', ()=> {
      const searchCountry = spyOn(component, 'searchCountry');
      component.selectionCallback({name: 'india'});
      expect(searchCountry).toHaveBeenCalledWith('india', true);
    })

    it('should call selectedCountry method', ()=> {
      const searchCountry = spyOn(component, 'searchCountry');
      component.selectionCallback({name: 'india'});
      expect(searchCountry).toHaveBeenCalledWith('india', true);
    })
  })

  describe('verify clearList', ()=> {
    it('should be defined', ()=> {
      expect(component.clearList).toBeDefined();
    })

    it('should reset clearList and compareObj', ()=> {
      expect(component.clearList.length).toEqual(0);
      expect(component.compareObj).toEqual({});
      component.clearList();
    })
  })

  describe('verify _filterCountryList', ()=> {
    it('should be defined', ()=> {
      expect(component._filterCountryList).toBeDefined();
    })
  })
});
