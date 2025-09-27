import { Pipe, PipeTransform } from "@angular/core";


// @Pipe({
//     name: 'logMessage', 
// })
// export class CustomLogMessagePipe implements PipeTransform{
//     transform(message: string, messageType: 'INFO' | 'ERROR' | 'SUCCESS' | 'WARN' = 'INFO') :string {
//         return `[${messageType}]: ${message}`
//     }
// }

@Pipe({
  name: 'convertCurrency'
})
export class ConvertCurrencyPipe implements PipeTransform {
  transform(amount: number, fromCurrency: string, toCurrency: string, exchangeRate: number): string {
    if (!amount || !exchangeRate) return 'Invalid input';

    const convertedAmount = amount * exchangeRate;
    return `${toCurrency} ${convertedAmount.toFixed(2)}`;
  }
}
