export class Game {
    public players: string[] = [];
    public player_images: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;  
    public currentCard: string | undefined = '';



    constructor(){
        for (let i = 1; i < 14; i++){
            this.stack.push('ace_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }
      
        shuffle(this.stack)
    }

    public toJson(){
        return {
            players: this.players,
            player_images: this.player_images,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }

    ///////////////////////////////////////

    fromJson(obj: any): Game {
        this.players = obj.players || [];
        this.player_images = obj.player_images || [];
        this.stack = obj.stack || [];
        this.playedCards = obj.playedCards || [];
        this.currentPlayer = obj.currentPlayer || 0;
        this.pickCardAnimation = obj.pickCardAnimation || false;
        this.currentCard = obj.currentCard || '';
    
        return this;
      }


    /////////////////////////////////////////

    
}

export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};