import { TestBed } from '@angular/core/testing';

import { MédiaService } from './média.service';

describe('MédiaService', () => {
  let service: MédiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MédiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
