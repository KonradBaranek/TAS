import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    credentials = this.auth.getUserDetails();

  edit() {
    console.log("edited: ",this.credentials);
    this.auth.edit(this.credentials).subscribe((res) => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  constructor(private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

}
