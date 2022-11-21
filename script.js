const maxSpeed = 7;
const speed = 0.1;
const brake = 0.3;
let j = 0;
let i = 0;
let k = 0;
let count = 0;
let arrowUpPressed, arrowDownPressed = false;
document.querySelector(`.green`).classList.add(`active`);
setInterval( e =>{
    j = j + 1;
    if(j % 9 == 0){
        document.querySelector(`.green`).classList.remove(`active`);
        document.querySelector(`.yellow`).classList.add(`active`);
        car.penalty();
        k = 0;
    }
    else if((j - 1) % 9 == 0){
        document.querySelector(`.yellow`).classList.remove(`active`);
        document.querySelector(`.red`).classList.remove(`active`);
        document.querySelector(`.green`).classList.add(`active`);
    }
    else if((j - 3) % 9 == 0){
        document.querySelector(`.green`).classList.add(`blinking`);
    }
    else if((j - 6) % 9 == 0){
        document.querySelector(`.green`).classList.remove(`active`);
        document.querySelector(`.green`).classList.remove(`blinking`);
        document.querySelector(`.yellow`).classList.add(`active`);
    }
    else if((j - 7) % 9 == 0){
        document.querySelector(`.yellow`).classList.remove(`active`);
        document.querySelector(`.red`).classList.add(`active`);
        car.penalty();
        k = 0;
    }
},1000)

setInterval( e =>{
    document.querySelector(`.count`).innerHTML = i;
    i = i + 1;
},10);

class Car{
    constructor(car,x,y,angle,speed){
        this.car = car;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
    }

    display(){

        this.car.style.transform = `rotate(${this.angle}deg)`;
        this.car.style.top = `${this.x}px`;
        this.car.style.left = `${this.y}px`;
    }

    forward(){
        const dx = this.speed * parseFloat(Math.sin((this.angle)*(Math.PI/180)));
        const dy = this.speed * parseFloat(Math.cos((this.angle)*(Math.PI/180)));
        this.x = Math.max(Math.min(this.x + dx, window.innerHeight - this.car.clientHeight - 20), 20);
		this.y = Math.max(Math.min(this.y + dy, window.innerWidth - this.car.clientWidth), 0);
    }

    rotatep(){
        this.angle += this.speed * 4;
    }

    rotaten(){
        this.angle -= this.speed * 4;
    }

    accelarate(v){
		this.speed = Math.min(Math.max(this.speed + v, -maxSpeed), maxSpeed);
	}

    brake(){
        if(this.speed < 0){
            this.accelarate(brake);
        }
        else if(this.speed > 0){
            this.speed = 0;
        }
    }

    slow(){
        setInterval(e =>{
            if(this.speed < 0){
                this.speed += 0.05;
            }
            else if(this.speed >= 0){
                this.speed == 0;
            }
        },100)
    }

    penalty(){
        if(this.speed != 0 && k == 0){
            i -= 500;
            k ++;
            document.querySelector(`.penalty`).innerHTML = `-500`;
            setTimeout(e =>{
                document.querySelector(`.penalty`).innerHTML = ``;
            },1000);
        }
    }

}

let car = new Car(document.querySelector(`.car`),50,50,-90,0);

setInterval(() =>{
    car.display();
    car.forward();
})

document.addEventListener("keydown", e => {
    e = e || window.event;

    if(e.keyCode == `38`){
        arrowUpPressed = true;
    }
    else if(e.keyCode == `40`){
        arrowDownPressed = true;
    }
    else if(e.keyCode == `37`){
        car.rotatep();
    }
    else if(e.keyCode == `39`){
        car.rotaten();
    }
    else if(e.keyCode == `32`){
        car.brake();
    }
    if(arrowUpPressed == true){
        car.accelarate(-speed);
    }
    else if(arrowDownPressed == true){
        car.accelarate(speed);
    }
});

document.addEventListener("keyup", e =>{
    if(e.keyCode == `38`){
        arrowUpPressed = false;
    }
    else if(e.keyCode == `40`){
        arrowDownPressed = false;
    }
})

car.slow();


