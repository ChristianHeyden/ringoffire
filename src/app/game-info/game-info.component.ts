import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges{

  cardAction = [
    { title: 'Waterfall', description: 'Alle fangen gleichzeitig an zu trinken. Sobald Spieler 1 aufhört, darf Spieler 2 aufhören, und so weiter.' },
    { title: 'You', description: 'Du entscheidest, wer trinken muss.' },
    { title: 'Me', description: 'Herzlichen Glückwunsch! Du trinkst einen Shot!' },
    { title: 'Category', description: 'Nenne eine Kategorie (z. B. Farben). Jeder Spieler muss reihum etwas aus der Kategorie nennen.' },
    { title: 'Bust a Jive', description: 'Spieler 1 macht einen Tanzmove. Spieler 2 wiederholt den Move und fügt einen hinzu.' },
    { title: 'Chicks', description: 'Alle Frauen trinken.' },
    { title: 'Heaven', description: 'Alle heben die Hände. Der letzte trinkt!' },
    { title: 'Mate', description: 'Wähle einen Trinkpartner. Immer wenn du trinkst, muss dein Partner auch trinken – und umgekehrt.' },
    { title: 'Thumbmaster', description: 'Lege deinen Daumen auf den Tisch. Der Letzte, der es bemerkt, trinkt.' },
    { title: 'Men', description: 'Alle Männer trinken.' },
    { title: 'Quizmaster', description: 'Du bist jetzt Quizmaster. Wer auf deine Fragen antwortet, ohne „Quizmaster“ zu sagen, trinkt.' },
    { title: 'Never Have I Ever', description: 'Sage etwas, das du noch nie getan hast. Jeder, der es getan hat, trinkt.' },
    { title: 'Rule', description: 'Erschaffe eine Regel. Wer sie bricht, trinkt.' },
    { title: 'Question Master', description: 'Stelle Fragen – wer darauf antwortet, trinkt.' },
    { title: 'King’s Cup', description: 'Gieße etwas von deinem Getränk in den Becher in der Mitte. Wer den nächsten König zieht, trinkt alles.' },
    { title: 'Snake Eyes', description: 'Schau jemandem in die Augen, während du trinkst. Wer zuerst wegsieht, trinkt noch einmal.' },
    { title: 'Story Time', description: 'Beginne eine Geschichte mit einem Satz. Jeder fügt einen Satz hinzu. Wer die Geschichte versaut, trinkt.' },
    { title: 'Little Green Man', description: 'Tu so, als hättest du einen kleinen grünen Mann auf deinem Glas. Nimm ihn jedes Mal herunter, wenn du trinkst – vergisst du ihn, trink doppelt.' },
    { title: 'Silent Game', description: 'Bis zum nächsten Zug darf niemand sprechen. Wer redet, trinkt.' },
    { title: 'Compliment Chain', description: 'Mache jemandem ein Kompliment. Die Person macht jemand anderem eins. Wer keines einfällt, trinkt.' }
  ];


  title: string = '';
  description: string = ''; 
  @Input() card: string | undefined= '';

ngOnInit(): void {
  
}

ngOnChanges() :void{
  if(this.card){
    console.log('Current card is:', this.card);
    console.log('Current number:', +this.card.split('_')[1]);
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title
    this.description = this.cardAction[cardNumber - 1].description
    }  
  }
}
