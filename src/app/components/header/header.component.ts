import {Component} from '@angular/core';
import {Role, UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {EventBusService} from '../../services/event-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUserData: UserModel | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private eventBusService: EventBusService,
    ) {}

  async goHome(){
    await this.router.navigate(['/']);
    this.eventBusService.emitToggleForm();
  }

  userIsLoggedIn() {
    let userString: string | null = sessionStorage.getItem('user');
    if (userString) {
      this.loggedInUserData = JSON.parse(userString);
      return true;
    }
    return false;
  }

  logout() {
    this.userService.performLogout();
  }

  protected readonly Role = Role;
}
