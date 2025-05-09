import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadesComponent } from './residencia.component';

describe('LocalidadesComponent', () => {
  let component: LocalidadesComponent;
  let fixture: ComponentFixture<LocalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
