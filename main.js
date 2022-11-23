status_var= "";
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting le object";
    search= document.getElementById("input").value;
}
function modelLoaded()
{
    console.log("Model is le loaded!");
    status_var= "true";
}
function draw()
{
    image(video, 0, 0, 380, 380);
    if(status_var != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            fill("00FFFF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y + 15);
            noFill()
            stroke("#00FFFF");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].heigth);
            if(objects[i].label == search)
            {
                video.stop();
                objectDetector.detect(gotResult);
                var synth = window.speechSynthesis;
                speak_data = 'Object that was searched is detected';
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
        }
    }
}
function gotResult(error, results)
{
    objects= [results];
}