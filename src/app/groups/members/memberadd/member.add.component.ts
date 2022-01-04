import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '@app/_services/alert.service';
import {MemberService} from '@app/_services/member.service';
import {Member} from '@app/_models';

@Component({
  selector: 'app-member-add',
  templateUrl: './member.add.component.html'
})
export class MemberAddComponent implements OnInit {
  formAddMember!: FormGroup;
  submitted = false;
  groupId!: string;

  @Output() newMember = new EventEmitter<Member>();

  constructor(
    private modalRef: NgbActiveModal,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.formAddMember = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      payed: ['0', Validators.required],
    });
  }

  get mEdit(): any { return this.formAddMember.controls; }

  onSubmitAddMember(): void {
    this.submitted = true;

    this.alertService.clear();

    // stop here if form is invalid
    if (this.formAddMember.invalid) {
      return;
    }
    this.memberService.addMember(this.groupId, this.mEdit.firstName.value, this.mEdit.lastName.value, this.mEdit.payed.value)
      .subscribe({
        next: (data) => {
          if (this.submitted) {
            this.newMember.emit(data);
            this.closeModal();
            this.alertService.success('Lid succesvol toegevoegd');
          }
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
