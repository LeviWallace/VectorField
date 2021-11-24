let canv1 = document.getElementById("canvas") as HTMLCanvasElement;
let ctx1 = canv1.getContext("2d");

const size = canv1.width;

function f(x: number, y: number): number
{
    return eval((<HTMLInputElement>document.getElementById("function")).value);
}

function main(): void
{
    draw();
}

function draw(): void 
{
    drawBackground();
    drawAxis();
    drawGrid();
    field();
}

function drawBackground(): void {
    ctx1.fillStyle = "rgb(248, 233, 232)";
    ctx1.fillRect(0, 0, size, size);
}

function drawAxis(): void
{
    ctx1.beginPath();
    ctx1.globalAlpha = 1;
    ctx1.lineWidth = 2;
    ctx1.strokeStyle = "rgb(0, 0, 0)";
    ctx1.moveTo(0, size/2);
    ctx1.lineTo(size, size/2)
    ctx1.moveTo(size/2, 0);
    ctx1.lineTo(size/2, size);
    ctx1.stroke();
    ctx1.closePath();
}

function drawGrid(): void
{
    ctx1.globalAlpha = .2;
    ctx1.lineWidth = 2;
    for(let xi = -10; xi <= 10; xi++)
    {   
        let xn = convert(xi)
        ctx1.strokeStyle = "black";
        ctx1.beginPath();
        ctx1.moveTo(xn, 0);
        ctx1.lineTo(xn, size);
        ctx1.stroke();
    }
    for(let yi = -10; yi <= 10; yi++)
    {   
        let yn = convert(yi)
        ctx1.strokeStyle = "black";
        ctx1.beginPath();
        ctx1.moveTo(0, yn);
        ctx1.lineTo(size, yn);
        ctx1.stroke();
    }
}

function lineSlope(x: number, y: number, m: number, len: number): void
{
    let ang = -Math.atan(m)
    ctx1.globalAlpha = 1;
    ctx1.strokeStyle = "red";
    ctx1.lineWidth = 3;
    ctx1.beginPath();
    ctx1.arc(x, y, 1, 0, 2*Math.PI, false);
    ctx1.moveTo(x - Math.cos(ang) * len/2, y - Math.sin(ang) * len/2);
    ctx1.lineTo(x + Math.cos(ang) * len/2, y + Math.sin(ang) * len/2);
    ctx1.lineTo(x + Math.cos(ang+Math.PI/2) * len/8, y + Math.sin(ang+Math.PI/2)*len/8);    
    ctx1.lineTo(x + Math.cos(ang-Math.PI/2) * len/8, y + Math.sin(ang-Math.PI/2)*len/8);
    ctx1.lineTo(x + Math.cos(ang) * len/2, y + Math.sin(ang) * len/2);
    ctx1.stroke();
    ctx1.closePath();
}

function field(): void
{
    for(let xi = -10; xi <= 10; xi++)
    {
        for(let yi = -10; yi <= 10; yi++)
        {
            let m = f(xi, yi);
            lineSlope(convert(xi), convert(yi), m, 20);
        }
    }
}

function convert(n: number): number
{
    return n * size/20 + size/2;
}

main();