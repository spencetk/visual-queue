import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaCardComponent } from './ta-card.component';

describe('TaCardComponent', () => {
  let component: TaCardComponent;
  let fixture: ComponentFixture<TaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
