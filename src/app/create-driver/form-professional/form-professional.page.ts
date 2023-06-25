import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverServiceService } from '../driver-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-professional',
  templateUrl: './form-professional.page.html',
  styleUrls: ['./form-professional.page.scss'],
})
export class FormProfessionalPage implements OnInit {
  public submited = false;
  public professionalForm: FormGroup;
  private receivedData: any;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private driverService: DriverServiceService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.email) {
        this.receivedData = params;
      }
    });
  }

  ngOnInit() {
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
      profile_photo: [''],
      driver_type: ['', Validators.required],
      about: ['', Validators.required],
      video: [''],
      activity_start: [''],
    });
  }

  /*async getIdDocs(fileInput: any, variable: String) {
    this.professionalForm.get('' + variable).setValue('');
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);
          const imgBase64Path = e.target.result;
          this.imageDoc = imgBase64Path;
          this.professionalForm.get('' + variable).setValue('' + imgBase64Path);
          //this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }*/

  async loadImagePH_DOC(event: any, variable: String) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.professionalForm.get('' + variable).setValue(reader.result);
    };

    const formData = new FormData();
    formData.append('image',file);

    const response = await this.http.put("http://127.0.0.1:8000/updateImage/diogoa.cerqueira@gmail.com", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(response);
      }
    )

  }

  public submitForm() {
    this.submited = true;
    if (!this.professionalForm.valid) {
      return false;
    } else {
      const data = {
        first_page: this.receivedData,
        second_page: this.professionalForm,
      };

      const data_emergency = {
        name: this.professionalForm.get('emerg_contact_name').value,
        phone: this.professionalForm.get('emerg_contact_phone').value,
        relation: this.professionalForm.get('emerg_contact_relation').value,
      };
      this.driverService.create_emergency(data_emergency);
      this.driverService.create_contact(data);
    }
  }

  public get errorControl() {
    return this.professionalForm.controls;
  }
}
