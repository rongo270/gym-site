import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterProductsComponent } from './starter-products.component';

describe('StarterProductsComponent', () => {
  let component: StarterProductsComponent;
  let fixture: ComponentFixture<StarterProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarterProductsComponent]
    });
    fixture = TestBed.createComponent(StarterProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
