import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "@app/_services/alert.service";
import {GroupService} from "@app/_services/group.service";
import {Group} from '@app/_models';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group.edit.component.html'
})
export class GroupEditComponent implements OnInit {
  formEditGroup!: FormGroup;
  submitted = false;
  groupInfo: any;
  @Output() editedGroup = new EventEmitter<Group>();

  constructor(
    private modalRef: NgbActiveModal,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.formEditGroup = this.formBuilder.group({
      groupName: [this.groupInfo.group.name, Validators.required],
      description: [this.groupInfo.group.description, Validators.required],
      ticketPrice: [this.groupInfo.group.ticketPrice, Validators.required],
    });
  }

  get gEdit(): any { return this.formEditGroup.controls; }

  onSubmitEditGroup(): void {
    this.submitted = true;

    this.alertService.clear();

    // stop here if form is invalid
    if (this.formEditGroup.invalid) {
      return;
    }
    this.groupService.editGroup(this.groupInfo.group.id,
      this.gEdit.groupName.value,
      this.gEdit.description.value,
      this.gEdit.ticketPrice.value)
      .subscribe({
        next: (data) => {
          if (this.submitted) {
            this.editedGroup.emit(data);
            this.closeModal();
            this.alertService.success('Groepsinformatie succesvol gewijzigd');
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
