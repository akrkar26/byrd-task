import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  public getCustomers(): Observable<any> {

    const url = `https://private-anon-84c1cc8157-byrd1.apiary-mock.com/customers`;

    return this._http.get(url);
  }

  public getOrders(customerId: string, startDate: string, endDate: string): Observable<any> {

    // tslint:disable-next-line:max-line-length
    const url = `https://private-anon-84c1cc8157-byrd1.apiary-mock.com/orders/${customerId}?start_date=${startDate}&end_date=${endDate}`;

    return this._http.get(url);
  }
}
