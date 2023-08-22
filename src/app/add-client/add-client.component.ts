import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  form?: FormControl;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
      this.initForm();
  }

  initForm() {
      this.form =  new FormControl('');

  }
}
