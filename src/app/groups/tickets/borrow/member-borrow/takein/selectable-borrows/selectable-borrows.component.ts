import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {BorrowPeriod} from '@app/_models/borrow.model';
import {TakeIn} from '@app/_dto/take-in.dto';
import {pairwise, startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';

interface FormProps {
  selected: boolean;
  sold: boolean; borrowId: string;
  bookNumber: number;
}

@Component({
  selector: 'app-selectable-borrows',
  templateUrl: './selectable-borrows.component.html'
})
export class SelectableBorrowsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() borrows: BorrowPeriod[] = [];
  @Output() selectedBorrowsChange = new EventEmitter<TakeIn[]>();

  form: FormGroup = new FormGroup({
    shadow: new FormControl(false),
    borrows: new FormArray([])
  });

  subs: Subscription[] = [];

  constructor() { }

  public get borrowControls(): FormGroup[] {
    return (this.form.controls.borrows as FormArray).controls as FormGroup[];
  }

  public getSelected(index: number): FormControl {
    return this.borrowControls[index].controls.selected as FormControl;
  }

  public getSold(index: number): FormControl {
    return this.borrowControls[index].controls.sold as FormControl;
  }

  private createControl(borrowPeriod: BorrowPeriod): void{
    const fg: FormGroup = new FormGroup({
      selected: new FormControl(false),
      sold: new FormControl(false),
      borrowId: new FormControl(borrowPeriod.id),
      bookNumber: new FormControl(borrowPeriod.ticket?.bookNumber)
    });
    (this.form.controls.borrows as FormArray).push(fg);
  }

  ngOnInit(): void {
    this.subs.push(this.form.valueChanges
      .pipe(startWith(undefined), pairwise())
      .subscribe(([dataOld, dataNew]) => {
      const selectedTakeIns: TakeIn[] = [];
      dataNew.borrows.forEach((selection: FormProps, key: number) => {
        // Logic to make selected true when sold is clicked and sold = false when unselected is checked
        if (dataOld === undefined){
          if (selection.sold){
            this.getSelected(key).setValue(true, {emitEvent: false});
          }
        } else {
          if (selection.sold && !(dataOld.borrows.filter((x: any) => selection.borrowId === x.borrowId)[0].sold)){
            this.getSelected(key).setValue(true, {emitEvent: false});
          }
          if (!(selection.selected) && dataOld.borrows.filter((x: any) => selection.borrowId === x.borrowId)[0].selected){
            this.getSold(key).setValue(false, {emitEvent: false});
          }
        }

        if (selection.selected) {
          selectedTakeIns.push({
            borrowPeriodId: selection.borrowId,
            sold: selection.sold,
          } as TakeIn);
        }
      });
      this.selectedBorrowsChange.next(selectedTakeIns);
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    (this.form.controls.borrows as FormArray).clear();
    this.borrows.forEach((item: BorrowPeriod) => {
      this.createControl(item);
    });
    this.form.controls.shadow.setValue(true);

  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
    });
  }
}
