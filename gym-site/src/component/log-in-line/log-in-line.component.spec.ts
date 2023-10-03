import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInLineComponent } from './log-in-line.component';

describe('LogInLineComponent', () => {
  let component: LogInLineComponent;
  let fixture: ComponentFixture<LogInLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInLineComponent]
    });
    fixture = TestBed.createComponent(LogInLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
