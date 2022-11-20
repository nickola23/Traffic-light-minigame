let i = 0;
let count = 0;
const maxSpeed = 7;
const speed = 0.1;
document.querySelector(`.green`).classList.add(`active`);
setInterval( e =>{
    i = i + 1;
    if(i % 9 == 0){
        document.querySelector(`.green`).classList.remove(`active`);
        document.querySelector(`.yellow`).classList.add(`active`);
    }
    else if((i - 1) % 9 == 0){
        document.querySelector(`.yellow`).classList.remove(`active`);
        document.querySelector(`.red`).classList.remove(`active`);
        document.querySelector(`.green`).classList.add(`active`);
    }
    else if((i - 3) % 9 == 0){
        document.querySelector(`.green`).classList.add(`blinking`);
    }
    else if((i - 6) % 9 == 0){
        document.querySelector(`.green`).classList.remove(`active`);
        document.querySelector(`.green`).classList.remove(`blinking`);
        document.querySelector(`.yellow`).classList.add(`active`);
    }
    else if((i - 7) % 9 == 0){
        document.querySelector(`.yellow`).classList.remove(`active`);
        document.querySelector(`.red`).classList.add(`active`);
    }
},1000)
document.onkeydown = checkKey;



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
        this.x += this.speed * parseFloat(Math.sin((this.angle)*(Math.PI/180)));
        this.y += this.speed * parseFloat(Math.cos((this.angle)*(Math.PI/180)));
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
}

let car = new Car(document.querySelector(`.car`),50,50,-90,0);

setInterval(() =>{
    car.display();
    car.forward();
})

function checkKey(e){
    e = e || window.event;

    if(e.keyCode == `38`){
        car.accelarate(-speed);
        setInterval( e =>{
            document.querySelector(`.count`).innerHTML = i;
            i = i + 1;
        },70);
    }
    else if(e.keyCode == `40`){
        car.accelarate(speed);
    }
    else if(e.keyCode == `37`){
        car.rotatep();
    }
    else if(e.keyCode == `39`){
        car.rotaten();
    }
}

