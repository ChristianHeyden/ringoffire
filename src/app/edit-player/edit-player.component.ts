import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent implements OnInit{

  allProfilePictures = ['player.png', 'player_female.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {};

  ngOnInit(): void {
    
  }

  onNoClick(){
    this.dialogRef.close();
  };
  

}
