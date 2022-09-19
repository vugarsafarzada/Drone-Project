// Vugar Safarzada
// CSS assignment: Drone Project 
// Date: 03/09/2022 


class Drone {
    element;
    location;
    speed;
    nIntervId;
    startTrigger;
    constructor(element, location, speed) {
        this.element = element;
        this.location = location;
        this.speed = speed;
        this.nIntervId = this.nIntervId
        this.startTrigger = true;
    }
    moveUp() {
        if (this.getOffset().top > 5) {
            this.axis_Y(this.speed);
        }
    }
    moveDown() {
        if (this.getOffset().top < 690) {
            this.axis_Y(this.speed * (-1));
        }
    }
    moveRight() {
        this.axis_X(this.speed);
    }
    moveLeft() {
        if (this.getOffset().left > -660) {
            this.axis_X(this.speed * (-1));
        }
    }
    axis_X(value) {
        clearInterval(this.nIntervId);
        this.element.style.transform = `rotate(${value/10}deg)`
        this.location.left += value;
        this.location.left < -650 ? this.location.left = -650 : ''
        this.location.left > 650 ? this.location.left = 650 : ''
        this.element.style.left = this.location.left + 'px';
        this.speedDown();
    }
    axis_Y(value) {
        clearInterval(this.nIntervId);
        this.location.bottom += value / 2;
        this.location.bottom < -350 ? this.location.bottom = -335 : ''
        this.location.bottom > 350 ? this.location.bottom = 320 : ''
        this.element.style.bottom = this.location.bottom + 'px';
        this.speedDown();
    }
    speedDown() {
        clearInterval(this.nIntervId);
        setTimeout(() => {
            this.element.style.transform = 'rotate(0deg)'
        }, 700)
        this.slowDown()
    }
    slowDown() {
        let deg = 2;
        this.nIntervId = setInterval(() => {
            if (this.getOffset().top < 690) {
                deg *= -1
                this.element.style.transform = `rotate(${deg}deg)`
                this.location.bottom -= 5;
                this.element.style.bottom = this.location.bottom + 'px';
            } else {
                this.element.style.transform = 'rotate(0deg)'
                document.getElementById('dots').style.backgroundColor = 'red'
            }
        }, this.speed * 3)
    }
    start() {
        if (this.startTrigger) {
            this.startTrigger = !this.startTrigger;
            this.moveDown();
            this.moveLeft();
            this.dotsLight(true)
            this.element.style.transform = 'rotate(0deg)';
            this.soundEffect().play();
            this.wings();
            document.addEventListener('keyup', function(e) {
                if (e.code === 'ArrowUp') {
                    drone.moveUp()
                }
                if (e.code === 'ArrowDown') {
                    drone.moveDown()
                }
                if (e.code === 'ArrowLeft') {
                    drone.moveLeft()
                }
                if (e.code === 'ArrowRight') {
                    drone.moveRight()
                }
            })
        } else {
            this.location.bottom = -335;
            this.element.style.bottom = this.location.bottom + 'px';
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    }
    wings() {
        const wings = document.getElementsByClassName('diamond-narrow')
        let trigger = true
        setInterval(() => {
            wings[0].style.display = trigger ? 'none' : 'block';
            wings[1].style.display = trigger ? 'none' : 'block';
            trigger = !trigger;
        }, 10)
    }
    dotsLight(status) {
        let trigger = true
        setInterval(() => {
            if (status) {
                document.getElementById('dots').style.backgroundColor = 'lime'
                document.getElementById('dots').style.display = trigger ? 'none' : 'block';
                trigger = !trigger;
            } else {
                document.getElementById('dots').style.backgroundColor = 'red'
            }
        }, 1000)

    }
    getOffset() {
        const rect = this.element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }
    soundEffect() {
        var audio = new Audio('sound_effect.mp3');
        audio.volume = 0.1;
        return audio;
    }
}

const drone = new Drone();
const element = document.getElementById('drone-body');
drone.element = element;
drone.location = { bottom: -335, left: 220 };
drone.speed = 320;
element.addEventListener('click', () => {
    drone.start();
    document.getElementById('text-start').style.display = 'none'
})