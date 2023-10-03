import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminComponent } from './product-admin.component';

describe('ProductAdminComponent', () => {
  let component: ProductAdminComponent;
  let fixture: ComponentFixture<ProductAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAdminComponent]
    });
    fixture = TestBed.createComponent(ProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



/*
        {
      id: 2, image: 'assets/images/products/bands.jpg',
      name: 'TRX', color: 'black', change: false,
      price: 55, available: 37,
      read: 'TRX for your home workout, can be used in many places and can woke on many mucullers.'
    }
    ,
    {
      id: 3, image: 'assets/images/products/bench.jpg',
      name: 'Bench', color: 'black', change: false,
      price: 160, available: 13,
      read: 'who doesn`t want a home bench? this is the best chest workout you can do, if you have place you have to buy it, tho make sure you will have a spoter'
    }
    ,
    {
      id: 4, image: 'assets/images/products/bike.jpg',
      name: 'Bike Machine', color: 'black', change: false,
      price: 70, available: 10,
      read: 'you want to ride a bike but you dont know how?, just buy the bike machine great cardio workout for you '
    }
    ,
    {
      id: 5, image: 'assets/images/products/chast.jpg',
      name: 'Chast Machine', color: 'black', change: false,
      price: 70, available: 10,
      read: 'good and safe chast workout for you'
    }
    ,
    {
      id: 6, image: 'assets/images/products/riwer.jpg',
      name: 'Raw Machine', color: 'black', change: false,
      price: 70, available: 10,
      read: 'raw raw raw'
    }
    ,
    {
      id: 7, image: 'assets/images/products/legs.jpg',
      name: 'Leg Press', color: 'black', change: false,
      price: 70, available: 10,
      read: 'who hert you?'
    }
      ,
    {
      id: 8, image: 'assets/images/products/treadmills.jpg',
      name: 'Treadmills', color: 'black', change: false,
      price: 70, available: 10,
      read: 'running at home'
    }
    ,
    {
      id: 9, image: 'assets/images/products/jump_sopes.jpg',
      name: 'Jump Sopes', color: 'blue', change: true,
      price: 70, available: 10,
      read: 'jump till you fall, and then jump again'
    } 

       

*/
