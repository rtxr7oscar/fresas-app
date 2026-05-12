import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent { }
