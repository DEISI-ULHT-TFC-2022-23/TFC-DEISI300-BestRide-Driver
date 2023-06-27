import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverServiceService } from '../driver-service.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../file.service';

@Component({
  selector: 'app-form-professional',
  templateUrl: './form-professional.page.html',
  styleUrls: ['./form-professional.page.scss'],
})
export class FormProfessionalPage implements OnInit {
  public submited = false;
  public professionalForm: FormGroup;
  public event: Event;
  private receivedData: any;
  private bi_file: File;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private driverService: DriverServiceService,
    private fileService: FileService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.email) {
        this.receivedData = params;
      }
    });
  }

  ngOnInit() {
    console.log(this.receivedData);
    this.professionalForm = this.formBuilder.group({
      docImage: ['', Validators.required],
      nif: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cc: ['', Validators.required],
      nation: ['', Validators.required],
      course: ['', Validators.required],
      driver_l: ['', Validators.required],
      ancat_l: ['', Validators.required],
      rnaat_l: ['', Validators.required],
      bank_iban: ['', [Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$')]],
      emerg_contact_name: ['', Validators.required],
      emerg_contact_phone: ['', Validators.required],
      emerg_contact_relation: ['', Validators.required],
      driver_type: ['', Validators.required],
      about: ['', Validators.required],
      video: [''],
      activity_start: [''],
    });
  }

  async loadImagePH_DOC(event: any, variable: String) {
    this.event = event;
    if(event.target.files.length == 0){
      return;
    }
    this.bi_file = event.target.files[0];
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file)
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl)
    this.professionalForm.get('' + variable).setValue(sanitizedUrl);

  }

  public submitForm() {
    this.submited = true;
    if (!this.professionalForm.valid) {
      return false;
    } else {
      const data = {
        ...this.receivedData,
        docImage: ''+this.professionalForm.get('docImage').value,
        nif: this.professionalForm.get('nif').value,
        citizenCard: ''+this.professionalForm.get('cc').value,
        nationality: ''+this.professionalForm.get('nation').value,
        courseTaken: ''+this.professionalForm.get('course').value,
        driverLicense:''+this.professionalForm.get('driver_l').value,
        ANCATNumber: ''+this.professionalForm.get('ancat_l').value,
        RNATLicense: ''+this.professionalForm.get('rnaat_l').value,
        IBAN: ''+this.professionalForm.get('bank_iban').value,
        driverType: ''+this.professionalForm.get('driver_type').value,
        about: ''+this.professionalForm.get('about').value,
        video: ''+this.professionalForm.get('video').value,
        activityStart: ''+this.professionalForm.get('activity_start').value,
        "emergency_contact": {
          name: this.professionalForm.get('emerg_contact_name').value,
          phone: '' + this.professionalForm.get('emerg_contact_phone').value,
          relation: this.professionalForm.get('emerg_contact_relation').value
        }
      };

      this.driverService.create_contact(data).subscribe(
        () => {
          this.driverService.upload_image(data.email, this.fileService.getFile(), 'profile_photo').subscribe(
            (res) => console.log(res),
            (err) => console.log(err),
          );
          this.driverService.upload_image(data.email, this.bi_file, 'bi_photo').subscribe(
            (res) => console.log(res),
            (err) => console.log(err),
          );
          // type of account is driver
          localStorage.setItem('accountRole', 'driver');
          localStorage.setItem('email', data.email);
          /* this.router.navigate([
            '/confirm-account',
            { queryParams: { source: 'driver' } },
          ]); */
        },
        (err) => {
          console.log(err);
        }
      );

    }
  }

  public get errorControl() {
    return this.professionalForm.controls;
  }
}
