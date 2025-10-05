import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoComplete } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { ApisService } from '../../../service/apis.service';
import { LoaderComponent } from '../loader/loader.component';
import { InputTextModule } from 'primeng/inputtext';
import { Tooltip } from "primeng/tooltip";
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-invoice',
  imports: [
    AutoComplete,
    ButtonModule,
    FormsModule,
    TableModule,
    NgIf,
    NgFor,
    DialogModule,
    FloatLabelModule,
    LoaderComponent,
    InputTextModule,
    Tooltip
],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent {
  isFetching = signal(false);

  visible: boolean = false;
  amount!: string;

  invoiceData: any;

  constructor(private route: ActivatedRoute, private api: ApisService, private auth: AuthService) {}

  selectedYear: any;
  selectedMonth: any;

  filteredYears!: any[];
  filteredMonths!: any[];

  years: any = [];
  months: any = [];

  userRole: string | null = null;
  isAdmin: boolean = false;
  isOfficer: boolean = false;
  isResident: boolean = false;

  filterYears(event: any) {
    const query = event.query;
    this.filteredYears = this.years.filter((year: any) =>
      year.toString().toLowerCase().includes(query.toLowerCase())
    );
    this.filteredYears = this.years.map((year:any) => ({ label: year, value: year }));
  }

  filterMonths(event: any) {
    const query = event.query;
    this.filteredMonths = this.months.filter((month:any) =>
      month.toString().toLowerCase().includes(query.toLowerCase())
    );
    this.filteredMonths = this.months.map((month:any) => ({ label: month, value: month }));
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }


  ngOnInit() {
     this.invoiceData = this.route.snapshot.data['invoiceData'];
     this.userRole = this.auth.getRole();
      this.isAdmin = this.auth.isAdmin();
      this.isOfficer = this.auth.isOfficer();
      this.isResident = this.auth.isResident();

    const yearsSet = new Set<any>();
    const monthsSet = new Set<any>();

    this.invoiceData.data.forEach((item: any) => {
      yearsSet.add(item.year);
      monthsSet.add(item.month);
    });

    this.years = [...yearsSet];

    this.months = [...monthsSet];

    this.filteredYears = [...this.years];
    this.filteredMonths = [...this.months];

    this.filteredYears = this.years.map((year:any) => ({ label: year, value: year }));
  this.filteredMonths = this.months.map((month:any) => ({ label: month, value: month }));
  }

  fetchInvoices(): void {
    this.api.getInvoices().subscribe({
      next: (res) => {
        this.invoiceData = res;
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
      },
    });
  }

  issueInvoice(): void {
    this.isFetching.set(true);

    if (Number(this.amount) <= 0) {
      this.isFetching.set(false);
      return;
    }

    this.api.putInvoice({ amount: Number(this.amount) }).subscribe({
      next: (res) => {
        this.fetchInvoices();
        this.visible = false;
        this.amount = '';
        this.isFetching.set(false);
      },
      error: (err) => {
        this.isFetching.set(false);
        console.error('Error adding invoice:', err);
      },
    });
  }
}
