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
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {  
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
    if(!this.game.pickCardAnimation){
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;


      console.log('New card: ' + this.game.currentCard);
      console.log(this.game);
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();

      setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard!);
      
      this.game.pickCardAnimation = false;
      this.saveGame();
      }, 1000)

    }

  }

  editPlayer(playerId: number) {
    console.log('Edit Player:', playerId)

    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Received change', change)  
      this.game.player_images[playerId] = change;
      this.saveGame();
    });
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.game.player_images.push('player.png')
        this.saveGame();
      }      
    });
  }


  async saveGame() {
   if (this.gameId) {
    const gameRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameRef, this.game.toJson());
    }
  }


}








