import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrailerPage } from './trailer.page';

describe('TrailerPage', () => {
  let component: TrailerPage;
  let fixture: ComponentFixture<TrailerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrailerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
