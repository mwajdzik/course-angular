import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {DataService} from "./data.service";
import {LifecycleComponent} from "./lifecycle/lifecycle.component";
import {LoggerComponent} from "./logger/logger.component";
import {DataBindingComponent} from "./databinding/data-binding.component";
import {FormsModule} from "@angular/forms";
import {LoggingService} from "./logging.service";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DataBindingComponent,
        LoggerComponent,
        LifecycleComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        LoggingService,
        DataService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have newFruit empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.newFruit).toEqual('');
  });

  it('should render the list of fruit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.panel-heading').textContent).toContain('Data binding');
  });

  it('should load fruit from the data service - async', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = <AppComponent>fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get<DataService>(DataService);

    let spy = spyOn<DataService>(dataService, 'getFruit')
      .and.returnValue(Promise.resolve(['banana', 'kiwi']));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(app.fruit).toEqual(['banana', 'kiwi']);
    });
  }));

  it('should load fruit from the data service - fakeAsync', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = <AppComponent>fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get<DataService>(DataService);

    let spy = spyOn<DataService>(dataService, 'getFruit')
      .and.returnValue(Promise.resolve(['banana', 'kiwi']));

    fixture.detectChanges();
    tick();

    expect(app.fruit).toEqual(['banana', 'kiwi']);
  }));
});
