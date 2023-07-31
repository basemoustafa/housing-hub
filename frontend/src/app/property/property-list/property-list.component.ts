import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  getAll = false;
  properties!: Array<IProperty>;

  constructor(
    private route: ActivatedRoute,
    private houseingService: HousingService
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.url.toString()) {
      this.getAll = true; // Means we are on base URL
    }
    if (this.route.snapshot.url.toString() == 'rent-property') {
      this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
    }

    this.houseingService.getAllProperties(this.SellRent, this.getAll).subscribe(
      (data) => {
        this.properties = data;
        console.log(data);
      },
      (err) => {
        console.log('http error');
        console.log(err);
      }
    );
  }
}
