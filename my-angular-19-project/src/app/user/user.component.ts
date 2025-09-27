import { Component, EventEmitter, Input, Output, output} from '@angular/core';

// import { DUMMY_USERS } from '../dummy-users';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)

// type User = {
//   id: string;
//   avatar: string;
//   name: string;
// }

interface User{
  id: string;
  avatar: string;
  name: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // @Input( {required: true }) id!: string;
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;
  @Input({required: true}) user!: User;
  // select = output<string>();
  @Output() select = new EventEmitter();
  // selectedUser = signal(DUMMY_USERS[randomIndex]);

  // avatar = input.required<string>();
  // name = input.required<string>();

  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar();
  // });

  get imagePath(){
    return 'users/' + this.user.avatar;
  }

  onSelectUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);
    // this.selectedUser = DUMMY_USERS[randomIndex];

    this.select.emit(this.user.id);
  }
}
