const root = document.getElementById("root");

const videoTag = document.createElement("video");
videoTag.controls = true;
videoTag.setAttribute("id", "video-player");
const sourceTag = document.createElement("source");
sourceTag.src = "";
videoTag.appendChild(sourceTag);

const buttonGroup = document.createElement("div");
buttonGroup.setAttribute("id", "btn-group");

function handleButtonClick(event) {
    const value = event.target.id;
    window.parent.parent.postMessage(
        { type: "video-chatbot-response", value: value },
        "*"
    );
}

root.appendChild(videoTag);
root.appendChild(buttonGroup);
const loader = document.getElementById("loader");
function playVideo() {
    loader.style.display = "none";
    videoTag.play();
}
function pauseVideo() {
    loader.style.display = "block";
    videoTag.pause();
}
function generateButtonGroup(buttonsPayload = []) {
    buttonGroup.textContent = "";
    for (let btnPayload of buttonsPayload) {
        const button = document.createElement("button");
        button.textContent = btnPayload.label;
        button.setAttribute("id", btnPayload.value);
        button.addEventListener("click", handleButtonClick);
        buttonGroup.appendChild(button);
    }
}
function updateVideo(video, buttonPayload) {
    sourceTag.src = video;
    videoTag.load();
    generateButtonGroup(buttonPayload);
}
window.addEventListener("message", (event) => {
    console.log("iframe message", event);
    if (event.data && event.data.type === "video-chatbot-event") {
        if (event.data.action === "play") {
            playVideo();
        } else if (event.data.action === "update") {
            updateVideo(
                event.data.payload.video,
                event.data.payload.buttonsPayload
            );
        } else if (event.data.action === "pause") {
            pauseVideo();
        }
    }
});
