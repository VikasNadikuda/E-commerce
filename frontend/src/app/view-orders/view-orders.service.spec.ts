import { TestBed } from '@angular/core/testing';

import { ViewOrdersService } from './view-orders.service';

describe('ViewOrdersService', () => {
  let service: ViewOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
