const sound = "https://www.soundjay.com/phone/sounds/cell-phone-vibrate-1.mp3";


class NewMessageSound{
    
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

const player = new NewMessageSound();

export default player;