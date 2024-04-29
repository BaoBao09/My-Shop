import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit  {
  isCreate: any;
  showUpdateModal: boolean = false;
  doneSetupForm: boolean = false;
  formdata: any;
  public formsearch: any;
  public page: number = 1;
  public pageSize: number = 5;
  public totalItems: number = 10;
  public currentPage = 1;
  public tenSP = "";
  public _api!: ApiService;
  public items: object[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754,
    },
  ];
  constructor(private fb: UntypedFormBuilder) {}
  ngOnInit(): void {
    this.formsearch = this.fb.group({
      payment_method: [''],
      student_id: [''],
    });

    //this.search();
  }
  loadPage(page: number) {
    setTimeout(() => {
      this._api.post('',{
        page: (page + 1), pageSize: this.pageSize}).subscribe((res) => {
          this.items = res.data;
          this.totalItems =  res.total;
      }),
        750;
    });
  }
  search() {
    this.page = 1;
    this.pageSize = 5;
    this._api.post('', {
      page: this.page, pageSize: this.pageSize,
    }).subscribe((res) => {
      this.items = res.data;
      this.totalItems =  res.total;
    });
  }
  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    alert(1);
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.tenSP = "123";
      this.formdata = this.fb.group({
        'Name': ['123', Validators.required],
        'DoB': ['', Validators.required],
        'Address': [''],
        'Phone': [''],
        'CCCD': [''],
        'Source': [''],
        'Note': [''],
        'Username': ['student_' + Math.floor(100000 + Math.random() * 900000)],
        'Password': ['123'],
        'nhaplaimatkhau': ['123', Validators.required],
        'Role': ['', Validators.required],
        'Form': "showUpdateModal"
      });
      // this.formdata.get('DoB').setValue(this.today);
      // this.formdata.get('Role').setValue(this.roles[2].value);
      this.doneSetupForm = true;
    });
  }
  updateModal(item : any)
  {
    debugger
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    $('#createUserModal').modal('toggle');
  }
  onSubmit(arg0: any) {
    
  }
  closeModal(id:any) {
    $(`#${id}`).modal('hide');
  }
}
