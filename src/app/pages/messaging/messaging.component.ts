import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  users: User[] = [];
  private currentUserId:number= +localStorage.getItem('user_id')!;
  searchTerm: string = '';

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(allUsers => {
      this.users = allUsers.filter(user => user.id !== this.currentUserId);
    });
  }

  contactUser(user: User) {
    // Logic to start or open a conversation with the user
  }


  get filteredUsers() {
    if (this.searchTerm) {
      return this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return this.users;
  }
}
