import { TestBed } from '@angular/core/testing';

import { BodyContentService } from './body-content.service';

describe('BodyContentService', () => {
  let service: BodyContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
