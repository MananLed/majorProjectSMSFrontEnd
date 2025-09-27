import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConvertCurrencyPipe } from '../custom-pipe/custom-pipe.component';


@Component({
  selector: 'app-pipe',
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, ConvertCurrencyPipe],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css'
})
export class PipeComponent {
  amount = 123.45;
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}
