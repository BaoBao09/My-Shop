import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  submitted: any;
  onSubmit(arg0: any) {
    throw new Error('Method not implemented.');
  }
  isCreate: boolean = true;
  showUpdateModal: boolean = false;
  doneSetupForm: boolean = false;
  formdata: any;
  
  public formsearch: any;
  public page: number = 1;
  public pageSize: number = 5;
  public totalItems: number = 10;
  public currentPage = 1;
  _api: ApiService | undefined;
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

    this.search();
  }
  loadPage(page: number) {
    setTimeout(() => {
      this._api?.get('').subscribe((res) => {
        //   this.incomes = res.data;
        //   this.totalRecords =  res.total;
        //   this.pageSize = this.pageSize;
      }),
        750;
    });
    // setTimeout(() => {
    // this._api.post('/api/income/search',{page: (page.page + 1), pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
    //   this.incomes = res.data;
    //   this.totalRecords =  res.total;
    //   this.pageSize = this.pageSize;
    // });
    // }, 750);
  }
  search() {
    this.page = 1;
    this.pageSize = 5;

    // this._api.post('/api/income/search',{page: this.page, pageSize: this.pageSize,
    //   student_id: this.formsearch.get('student_id').value ? this.formsearch.get('student_id').value : 0,
    //   payment_method: this.formsearch.get('payment_method').value.name,
    //   date_payment: this.formsearch.get('date_payment').value })
    //   .subscribe(res => {

    //   this.totalPay = 0;
    //   this.totalEarn = 0;
    //   this.incomes = res.data;
    //   this.incomes.forEach(element => {
    //     if(element.status == "Thu") {
    //       this.totalPay += element.amount

    //     } else {
    //       this.totalEarn += element.amount
    //     }

    //   });
    //   this.totalRecords =  res.total;
    //   this.pageSize = this.pageSize;
    //   this.isLoading = false;
    // });
  }
  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'Name': ['', Validators.email],
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
  closeModal(id:any) {
    $(`#${id}`).modal('hide');
  }
}
