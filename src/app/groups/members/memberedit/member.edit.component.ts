import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '@app/_services/alert.service';
import {MemberService} from '@app/_services/member.service';
import {Member} from '@app/_models';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member.edit.component.html'
})
export class MemberEditComponent implements OnInit {
  formEditMember!: FormGroup;
  submitted = false;
  memberInfo: any;

  @Output() editedMember = new EventEmitter<Member>();

  constructor(
    private modalRef: NgbActiveModal,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.formEditMember = this.formBuilder.group({
      firstName: [this.memberInfo.firstName, Validators.required],
      lastName: [this.memberInfo.lastName, Validators.required],
      payed: [this.memberInfo.payed, Validators.required],
    });
  }

  get mEdit(): any { return this.formEditMember.controls; }

  onSubmitEditMember(): void {
    this.submitted = true;

    this.alertService.clear();

    // stop here if form is invalid
    if (this.formEditMember.invalid) {
      return;
    }

    this.memberService.editMember(this.memberInfo.groupId,
      this.memberInfo.id,
      this.mEdit.firstName.value,
      this.mEdit.lastName.value,
      this.mEdit.payed.value)
      .subscribe({
        next: (data) => {
          if (this.submitted) {
            this.editedMember.emit(data);
            this.closeModal();
            this.alertService.success('Lid succesvol gewijzigd');
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
