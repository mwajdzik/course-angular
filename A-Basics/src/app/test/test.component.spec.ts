import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TestComponent} from './test.component';
import {TestService} from './test.service';
import {By} from '@angular/platform-browser';

describe('TestComponent', () => {
  const testQuote = 'TEST QUOTE';

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let testService: any;

  let spy: any;
  let de: any;
  let el: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [TestService],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    testService = fixture.debugElement.injector.get(TestService);

    spy = spyOn(testService, 'getQuote')
      .and.returnValue(Promise.resolve(testQuote));

    de = fixture.debugElement.query(By.css('.test'));
    el = de.nativeElement;
  });

  it('should not show quote before OnInit', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
  });

  it('should still not show quote after component initialized', () => {
    fixture.detectChanges();

    expect(el.textContent).toBe('...', 'no quote yet');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  it('should show quote after getQuote promise (async)', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.textContent).toBe(testQuote);
    });
  }));

  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    fixture.detectChanges();
    expect(el.textContent).toBe(testQuote);
  }));
});
