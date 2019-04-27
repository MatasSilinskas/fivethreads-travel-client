import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { UserService } from 'src/app/@core/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from 'src/app/@core/abstractions/user';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CalendarView, CalendarEvent } from 'angular-calendar';

import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { TripService } from 'src/app/@core/trip.service';
import { Trip, TripMember, Accommodation, CarTicket, FlightTicket } from 'src/app/@core/abstractions/trip';

class TripUser extends TripMember {
  firstname: string;
  lastname: string;
  color?: string;
}
@Component({
  selector: 'app-trip-creation',
  templateUrl: './tripCreation.component.html',
  styleUrls: ['./tripCreationForm.component.scss']
})
export class TripCreationFormComponent implements OnInit {
  selection: SelectionModel<TripUser>;
  selectedUser: TripUser;
  allUsers: TripUser[];
  usersToSelectFrom: TripUser[];
  departureDate: Date;
  arrivalDate: Date;
  min = new Date();

  latitudeArrival: number;
  longitudeArrival: number;
  searchControlArrival: FormControl;
  latitudeDeparture: number;
  longitudeDeparture: number;
  searchControlDeparture: FormControl;
  zoom: number;

  @ViewChild('searchDeparture')
  public searchElementRefDeparture: ElementRef;
  @ViewChild('searchArrival')
  public searchElementRefArrival: ElementRef;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  tripEvent: CalendarEvent = {
    start: new Date(),
    end: new Date(),
    id: 0,
    title: 'Trip',
    color: {
      primary: '#FF0000',
      secondary: '#FF0000',
    },
    allDay: true,
  };
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;

  // constructor(public windowRef: NbWindowRef) {}
  constructor(private userService: UserService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private tripsService: TripService, private toaster: NbToastrService) { }

  ngOnInit() {
    this.userService.getAll()
      .pipe(
        map(users => users.map(user => {
          const tripUser = new TripUser();
          tripUser.email = user.email;
          tripUser.firstname = user.firstname;
          tripUser.lastname = user.lastname;
          tripUser.isAccommodationNeeded = false;
          tripUser.isCarNeeded = false;
          tripUser.isFlightTickedNeeded = false;
          tripUser.accommodationDTO = new Accommodation();
          tripUser.carTicketDTO = new CarTicket();
          tripUser.flightTicketDTO = new FlightTicket();
          tripUser.color = this.randomColor();
          return tripUser;
        }))
      )
      .subscribe(users => {
        this.allUsers = users;
        this.usersToSelectFrom = users;
      });
    this.selection = new SelectionModel<TripUser>(true, []);

    this.selection.onChange.subscribe(() => {
      this.usersToSelectFrom = this.allUsers.filter(user => !this.selection.isSelected(user));
      this.selectedUser = (this.usersToSelectFrom.length > 0) ? this.usersToSelectFrom[0] : null;
    });

    this.zoom = 10;
    this.latitudeDeparture = 54.687157;
    this.latitudeDeparture = 54.687157;
    this.longitudeDeparture = 25.279652;
    this.longitudeArrival = 25.279652;

    this.searchControlDeparture = new FormControl();
    this.searchControlArrival = new FormControl();

    // this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocompleteDeparture = new google.maps.places.Autocomplete(this.searchElementRefDeparture.nativeElement, {
        types: ['address']
      });
      autocompleteDeparture.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocompleteDeparture.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitudeDeparture = place.geometry.location.lat();
          this.longitudeDeparture = place.geometry.location.lng();
        });
      });

      const autocompleteArrival = new google.maps.places.Autocomplete(this.searchElementRefArrival.nativeElement, {
        types: ['address']
      });
      autocompleteArrival.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocompleteArrival.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitudeArrival = place.geometry.location.lat();
          this.longitudeArrival = place.geometry.location.lng();
        });
      });
    });
  }

  add() {
    this.selection.select(this.selectedUser);
  }

  remove(user: TripUser) {
    this.selection.deselect(user);
  }

  private randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  save() {
    const trip = new Trip();
    trip.arrival = `${this.latitudeArrival} ${this.longitudeArrival}`;
    trip.departure = `${this.latitudeDeparture} ${this.longitudeDeparture}`;
    trip.startDate = this.departureDate;
    trip.finishDate = this.arrivalDate;
    trip.organizer_email = 'test@test.com';
    trip.tripMembers = this.selection.selected;

    this.tripsService.create(trip).subscribe((res) => {
      this.toaster.success('Success', res);
    });
  }

  onChangeDate() {
    this.tripEvent.start = this.departureDate;
    this.tripEvent.end = this.arrivalDate;

    this.events = this.events.filter(event => event.id !== 0);
    this.events.push(this.tripEvent);
  }

  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitudeDeparture = position.coords.latitude;
  //       this.longitudeDeparture = position.coords.longitude;
  //       this.zoom = 10;
  //     });
  //   }
  // }

  // close() {
  //   this.windowRef.close();
  // }
}
