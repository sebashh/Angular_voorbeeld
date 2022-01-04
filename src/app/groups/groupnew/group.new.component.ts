import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '@app/_services/alert.service';
import {GroupService} from '@app/_services/group.service';
import {Group} from '@app/_models';
import {AbstractConstructor} from '@angular/material/core/common-behaviors/constructor';
import {GroupUserResult} from '@app/_dto/groupuserresult.dto';

@Component({
  selector: 'app-group-new',
  templateUrl: './group.new.component.html'
})
export class GroupNewComponent implements OnInit {
  formNewGroup!: FormGroup;
  submitted = false;

  @Output() newGroup = new EventEmitter<GroupUserResult>();

  constructor(
    private modalRef: NgbActiveModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.formNewGroup = this.formBuilder.group({
      groupName: ['', Validators.required],
      description: ['', Validators.required],
      ticketPrice: ['', Validators.required],
      // publicly: ['']
    });
  }

  get gNew() {
    return this.formNewGroup.controls;
  }

  onSubmitNewGroup(): void {
    this.submitted = true;

    this.alertService.clear();

    // stop here if form is invalid
    if (this.formNewGroup.invalid) {
      return;
    }
    this.groupService.createNewGroup(this.gNew.groupName.value, this.gNew.description.value, this.gNew.ticketPrice.value)
      .subscribe({
        next: (group) => {
          if (this.submitted) {
            this.closeModal();
            this.newGroup.emit(group);
            this.alertService.success('Groep succesvol toegevoegd');
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
