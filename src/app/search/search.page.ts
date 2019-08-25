import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

export interface CustomerFormData {
  customerId?: string;
  startDate?: string;
  endDate?: string;
}

@Component({
  selector: 'search-page',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  private _customersList = [];
  private _customerFilterData: CustomerFormData = {} as CustomerFormData;

  constructor(private _service: CustomerService,
              private _router: Router, private _altCtrl: AlertController,
              private _storage: Storage) {

    this._loadCustomers();
  }

  private _loadCustomers() {

    this._service.getCustomers().subscribe((customers) => {
      this._customersList = customers;
    });

    this._storage.get('customer').then((cust) => {
      if (cust) {
        this._customerFilterData = cust;
      }
    });
  }

  private _searchOrders(customer: NgForm) {

    if (customer && customer.valid) {
      this._storage.set('customer', this._customerFilterData);
      this._router.navigate(['/orders'], { queryParams: { filterData: JSON.stringify(this._customerFilterData) }});
    } else {
      this._alertUser();
    }
  }

  private async _alertUser() {

    const alert = await this._altCtrl.create({
      header: 'Information',
      message: 'All fields are mandatory',
      buttons: ['OK']
    });

    await alert.present();
  }
}
