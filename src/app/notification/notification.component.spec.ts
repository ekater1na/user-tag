import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
      providers: [NotificationService],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a notification when service emits one', fakeAsync(() => {
    notificationService.show('Test notification', 'info');
    fixture.detectChanges();

    const notificationElement = fixture.debugElement.query(
      By.css('.notification')
    );
    expect(notificationElement).toBeTruthy();
    expect(notificationElement.nativeElement.textContent).toContain(
      'Test notification'
    );
    expect(notificationElement.nativeElement.classList).toContain('info');

    tick(1500);
    fixture.detectChanges();

    const notificationElementAfter = fixture.debugElement.query(
      By.css('.notification')
    );
    expect(notificationElementAfter).toBeFalsy();
  }));
});
