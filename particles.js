const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];

const colors = ['#00ff99'];

const maxSize = 2;
const minSize = 0;
const mouseRadius = 60;

window.addEventListener('mousemove',
  function(event){
    mouse.x = event.x;
    mouse.y = event.y;
  }
)

const mouse = {
  x: undefined,
  y: undefined
}

function Particle(x, y, directionX, directionY, size, color){
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

Particle.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}

Particle.prototype.update = function(){
  if(this.x + this.size > canvas.width || this.x - this.size < 0){
    this.directionX = -this.directionX;
  }
  if(this.y + this.size > canvas.height || this.y - this.size < 0){
    this.directionY = -this.directionY;
  }

  this.x += this.directionX;
  this.y += this.directionY;

  this.draw();
}

function init(){
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++){
    let size = (Math.random() * 2) + 1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 2) - 1;
    let directionY = (Math.random() * 2) - 1;
    let color = colors[Math.floor(Math.random() * colors.length)];

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
  }
  connect();
}

function connect(){
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++){
    for (let b = a; b < particlesArray.length; b++){
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
      if(distance < (canvas.width/7) * (canvas.height/7)){
        opacityValue = 1 - (distance/20000);
        ctx.strokeStyle = 'rgba(0, 255, 153,' + opacityValue + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener('resize',
  function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  }
)

canvas.width = innerWidth;
canvas.height = innerHeight;
init();
animate();