import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  submissionSuccess: boolean = false;
  submissionError: boolean = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.submissionSuccess = true;
      this.submissionError = false;
      form.resetForm(); 
    } else {
      this.submissionError = true;
      this.submissionSuccess = false;
    }
  }
}
