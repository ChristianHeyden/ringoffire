import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule, MatDialogActions, MatButtonModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  
  ngOnInit(){}

  onNoClick(){};


}
