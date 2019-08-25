import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerFormData } from '../search/search.page';
import * as moment from 'moment';

interface Summary {
  from?: string;
  to?: string;
  days?: number;
  amount?: number;
  totalOrders?: number;
}

@Component({
  selector: 'orders-page',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage implements OnInit {

  private _orderList = [];
  private _summary = {} as Summary;

  constructor(private _activatedRoute: ActivatedRoute, private _service: CustomerService) {}

  ngOnInit() {

    this._activatedRoute.queryParams.subscribe((params) => {
      if (params && params.filterData) {

        const filterData = JSON.parse(params.filterData);

        this._loadOrders(filterData);
      }
    });
  }

  private _loadOrders(filterData: CustomerFormData) {

    this._service.getOrders(filterData.customerId, filterData.startDate, filterData.endDate).subscribe((orders) => {
      this._orderList = orders;
      this._prepareData(filterData);
    });
  }

  private _prepareData(filterData: CustomerFormData) {
    this._summary.from = filterData.startDate;
    this._summary.to = filterData.endDate;
    this._summary.days = moment(this._summary.to).diff(this._summary.from, 'days');
    this._summary.amount = this._calculateTotalAmount();
    this._summary.totalOrders = this._orderList.length;
  }

  private _calculateTotalAmount(): number {
    let amount = 0;

    this._orderList.forEach((order) => {
      const charge = order.charge_customer;
      const items = order.items || [];
      let totalPrice = 0;

      if (charge) {
        amount = amount + Number(charge.total_price);
      }

      items.forEach((item) => {
        item.total_price ? (totalPrice = Number(item.total_price.amount) + totalPrice) : (totalPrice = amount);
      });
      order.totalPrice = totalPrice;
    });

    return amount;
  }
}
