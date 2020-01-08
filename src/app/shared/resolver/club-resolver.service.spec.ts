import { TestBed } from '@angular/core/testing';

import { ClubResolverService } from './club-resolver.service';

describe('ClubResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClubResolverService = TestBed.get(ClubResolverService);
    expect(service).toBeTruthy();
  });
});
