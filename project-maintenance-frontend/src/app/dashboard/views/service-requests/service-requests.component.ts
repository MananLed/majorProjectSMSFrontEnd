import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-service-requests',
  imports: [FormsModule, AutoComplete, ButtonModule, TableModule, CommonModule],
  templateUrl: './service-requests.component.html',
  styleUrl: './service-requests.component.scss'
})
export class ServiceRequestsComponent {
  selectedItem: any;

    filteredItems!: any[];

    items: any[] | undefined;

    filterItems(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.items as any[]).length; i++) {
            let item = (this.items as any[])[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    ngOnInit() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }
}
