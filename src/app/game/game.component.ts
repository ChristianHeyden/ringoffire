import { CommonModule, getLocaleDayNames } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { Firestore, collection, collectionData, onSnapshot, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { list, update } from '@angular/fire/database';
import { elementAt } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;  
  currentCard: string | undefined = '';
  game: Game = new Game();
  gameId!: string;

  private firestore: Firestore = inject(Firestore);

  unsubList;
  
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {

    this.unsubList = onSnapshot(collection(this.firestore, 'games'), (list) =>{
      list.forEach(element =>{
        //console.log(element.data());
      })
    });

  }


  // ngOnInit(): void {
  //   this.newGame();
  //   this.route.params.subscribe((params) => {
  //     console.log(params['id']);
    

  //     this
  //       .firestore
  //       .collection('games')
  //       .doc(params.id)
  //       .valueChanges()
  //       .subscribe((game: any) => {
  //         console.log('Game update', game);
  //         this.game.currentPlayer = game.currentPlayer;
  //         this.game.playedCards = game.playedCards;
  //         this.game.players = game.players;
  //         this.game.stack = game.stack;
  //       });

  //   })
  // }


  /////////////////////


  ngOnInit(): void {
   // this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('Game ID:', this.gameId);
  
      if (this.gameId) {
        const gameDocRef = doc(this.firestore, 'games', this.gameId);
        docData(gameDocRef).subscribe((gameData) => {
          console.log('Firestore Game Data:', gameData);
          this.game = new Game().fromJson(gameData);
        });
      } else {
        this.newGame();
      }
    });
  }



  /////////

  async newGame(){
    this.game = new Game();
    
    //await addDoc(collection(this.firestore, 'games'), this.game.toJson())
    
    
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

  takeCard(){
    if(!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;


      console.log('New card: ' + this.currentCard);
      console.log(this.game);
      this.saveGame();


      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
      this.game.playedCards.push(this.currentCard!);
      this.saveGame();
      this.pickCardAnimation = false;
      }, 1000)

    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.saveGame();
      }      
      console.log('The dialog was closed', name);
    });
  }


  saveGame() {
   if (this.gameId) {
    const gameRef = doc(this.firestore, 'games', this.gameId);
    updateDoc(gameRef, this.game.toJson());
    }
  }


}








