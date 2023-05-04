import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMapComponent } from './my-map-component.component';

describe('MyMapComponentComponent', () => {
  let component: MyMapComponent;
  let fixture: ComponentFixture<MyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
