import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsPage } from './my-posts.page';

describe('MyPostsPage', () => {
  let component: MyPostsPage;
  let fixture: ComponentFixture<MyPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
