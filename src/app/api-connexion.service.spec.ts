import { TestBed } from '@angular/core/testing';

import { ApiConnexionService } from './api-connexion.service';

describe('ApiConnexionService', () => {
  let service: ApiConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
