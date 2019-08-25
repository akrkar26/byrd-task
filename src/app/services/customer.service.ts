import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  public getCustomers(): Observable<any> {

    const url = `${environment.CUSTOMER_URL}`;

    return this._http.get(url);
  }

  public getOrders(customerId: string, startDate: string, endDate: string): Observable<any> {

    // tslint:disable-next-line:max-line-length
    const url = `${environment.ORDERS_URL}${customerId}?start_date=${startDate}&end_date=${endDate}`;

    return this._http.get(url);
  }
}
