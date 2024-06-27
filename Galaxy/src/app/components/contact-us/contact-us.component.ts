import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  submissionSuccess: boolean = false;
  submissionError: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Handle form submission here (e.g., send email notification, etc.)
      this.sendEmailNotification(form.value);
      this.submissionSuccess = true;
      this.submissionError = false;
      form.resetForm();
    } else {
      this.submissionError = true;
      this.submissionSuccess = false;
    }
  }

  sendEmailNotification(formData: any) {
    console.log('Sending email notification...', formData);

    setTimeout(() => {
      console.log('Email sent successfully to:', formData.email);
    }, 2000);
  }
}
