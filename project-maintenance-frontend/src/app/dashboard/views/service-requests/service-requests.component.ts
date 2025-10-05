import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Avatar } from "primeng/avatar";
import { DialogModule } from 'primeng/dialog';
import { ApisService } from '../../../service/apis.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-service-requests',
  imports: [
    FormsModule,
    AutoComplete,
    ButtonModule,
    TableModule,
    CommonModule,
    Tooltip,
    Avatar,
    DialogModule,
    LoaderComponent
],
  templateUrl: './service-requests.component.html',
  styleUrl: './service-requests.component.scss',
})
export class ServiceRequestsComponent {
  selectedService: any;
  selectedStatus: any;
  filteredService!: any[];
  filteredStatus!: any[];
  userRole: string | null = null;
  isAdmin: boolean = false;
  isOfficer: boolean = false;
  isResident: boolean = false;
  totalRequestCount: any;
  pendingRequestCount: any;
  approvedRequestCount: any;
  allRequestData: any;
  pendingRequestData: any;
  approvedRequestData: any;
  isFetching = signal(false);

  constructor(private auth: AuthService, private route: ActivatedRoute, private api: ApisService) {}

  private allServices = [
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Plumber', value: 'Plumber' },
  ];
  private allStatuses = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Approved', value: 'Approved' },
  ];
  ngOnInit() {
    const requestData = this.route.snapshot.data['requestData'];

    console.log(requestData);
    this.pendingRequestCount = requestData.data.Pending === null ? 0 : requestData.data.Pending.length;
    this.approvedRequestCount = requestData.data.Approved === null? 0 : requestData.data.Approved.length;
    this.totalRequestCount = this.pendingRequestCount + this.approvedRequestCount;

    console.log(this.pendingRequestCount);
    console.log(this.approvedRequestCount);
    console.log(this.totalRequestCount);
    
    this.pendingRequestData = requestData.data.Pending || [];
    this.approvedRequestData = requestData.data.Approved || [];
    const data = {...(this.pendingRequestData || []), ...(this.approvedRequestData || [])};
    this.allRequestData = Object.values(data);


    console.log(this.pendingRequestData);
    console.log(this.approvedRequestData);
    console.log(this.allRequestData);

    this.filteredService = this.allServices;
    this.filteredStatus = this.allStatuses;
    this.userRole = this.auth.getRole();
    this.isAdmin = this.auth.isAdmin();
    this.isOfficer = this.auth.isOfficer();
    this.isResident = this.auth.isResident();
  }

  filterStatus(event: any) {
    const query = event.query.toLowerCase();
    this.filteredStatus = this.allStatuses.filter((status) =>
      status.label.toLowerCase().includes(query)
    );
  }

  filterService(event: any) {
    const query = event.query.toLowerCase();
    this.filteredService = this.allServices.filter((service) =>
      service.label.toLowerCase().includes(query)
    );
  }

//   fetchRequests(): void{
//   }


//   showConfirmDialog(id: any):void {
//     this.isFetching.set(true);
//     this.confirmationService.confirm({
//         message: 'Are you sure you want to cancel this request?',
//         header: 'Confirm Delete',
//         icon: 'pi pi-exclamation-triangle',
//         acceptLabel: 'Yes',
//         rejectLabel: 'No',
//         accept: () => {
//             this.api.deleteRequest(id).subscribe({
//                 next: () =>{
//                     this.fetchRequests();
//                     this.isFetching.set(false);
//                 },
//                 error: (err) => {
//                     this.isFetching.set(false);
//                     console.error('Error in cancelling service request:', err);
//                 }
//             });
//         }
//     });
//   }
}
