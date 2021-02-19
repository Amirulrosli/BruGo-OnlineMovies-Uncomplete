import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoviePostPage } from './movie-post.page';

describe('MoviePostPage', () => {
  let component: MoviePostPage;
  let fixture: ComponentFixture<MoviePostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviePostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
