const sound = "http://ahandfulof.me/fail/zvuk-soobshcheniya-v-kontakte.mp3";


class NewNotification{
    
    constructor()
    {
        this.playing = false;
        this.locked = false;        
    }

    toggle( state )
    {
        this.locked = state === true;
    }

    play()
    {
        
        if(this.locked)
        {
            return false;
        }// end if

        if(!this.playing)
        {
            let audio = new Audio(sound);
            audio.play();
            audio.onended = e => {
                this.playing = false;
            }
        }
    }
}

const player = new NewNotification();

export default player;