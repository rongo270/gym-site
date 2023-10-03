import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  Revetso = [
    { id: 1, name: 'north', telefon: '03-1111111', adress: 'St. The-Zafon 83', time: 'Sunday-Thursday: 5:00 - 23:00 <br> Holidays and weeknds: 6:00 - 18:00'},
    { id: 2, name: 'center', telefon: '03-2222222', adress: 'St. The-Marcaz 91', time: 'Sunday-Thursday: 6:00 - 00:00 <br> Holidays and weeknds: 6:00 - 17:00' },
    { id: 3, name: 'south', telefon: '03-3333333', adress: 'St. The-darom 123', time: 'Sunday-Thursday: 5:00 - 22:00 <br>  Holidays and weeknds: 5:00 - 19:00' },

  ]


}
