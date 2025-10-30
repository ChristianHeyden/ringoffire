import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, onSnapshot, addDoc, doc, docData } from '@angular/fire/firestore';
import { Game } from '../../models/game';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}


  
  async newGame() {
    let game = new Game();
  
    try {
      const docRef = await addDoc(collection(this.firestore, 'games'), game.toJson());
      console.log('Spiel wurde angelegt mit ID:', docRef.id);

      this.router.navigateByUrl('/game/' + docRef.id);
    } catch (err) {
      console.error('Fehler beim Erstellen des Spiels:', err);
    }
  }



  // newGame(){
  //   let game = new Game();

  //   addDoc(collection(this.firestore, 'games'), game.toJson().then((gameInfo: any) =>{console.log(gameInfo)})  
  //   );

  //  // this.router.navigateByUrl('/game')
  // }

}
