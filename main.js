objects=[];
status="";
function preload()
{
    video = createCapture(VIDEO);
}

function setup()
{
canvas = createCanvas(500,300);
canvas.center();
}


function play()
{
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
input = document.getElementById("input_box").value;
}
function modelLoaded()
{
console.log("Model is loaded");
status=true;
}

function gotResults(error, results)
{
if(error)
{
console.log(error);
}
else{
console.log(results);
objects = results;
}
}

function draw()
{
image(video, 0,0,500,300);
if(status != "")
{
    objectDetector.detect(video, gotResults);
for(i=0; i<objects.length; i++)
{
    document.getElementById("status").innerHTML="Status: Objects detected";
document.getElementById("object_length").innerHTML="Status: The number of objects detected are"+objects.length;

percent = floor(objects[i].confidence *100);
fill("red");
text(objects[i].label+" " + percent+"%", objects[i].x +15, objects[i].y+15);
noFill();
stroke("red");
rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height);
}
}
}