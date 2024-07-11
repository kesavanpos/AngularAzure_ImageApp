import { Component, OnInit,Input } from '@angular/core';
import {Image } from "../models/image";

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {
  @Input() image!: Image;
  constructor() { }

  ngOnInit(): void {
  }

}
