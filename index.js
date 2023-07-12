let video = "";
let buttonsPayload = [];
function setupCode() {
    if (window.location.search) {
        const params = new URLSearchParams(window.location.search);
        video = decodeURI(params.get("video"));
        try {
            buttonsPayload = JSON.parse(decodeURI(params.get("buttons"))) || [];
            console.log("buttonsPayload", buttonsPayload);
        } catch (err) {
            console.error(err);
        }
    }
}
setupCode();
const root = document.getElementById("root");
const videoTag = document.createElement("video");
videoTag.controls = true;
videoTag.autoplay = true;
videoTag.setAttribute("id", "video-player");
const sourceTag = document.createElement("source");
sourceTag.setAttribute("src", video);
videoTag.appendChild(sourceTag);

const buttonGroup = document.createElement("div");
buttonGroup.setAttribute("id", "btn-group");
const buttons = [];

function handleButtonClick(event) {
    const value = event.target.id;
    window.parent.parent.postMessage(
        { type: "video-chatbot-response", value: value },
        "*"
    );
}
for (let btnPayload of buttonsPayload) {
    const button = document.createElement("button");
    button.textContent = btnPayload.label;
    button.setAttribute("id", btnPayload.value);
    button.addEventListener("click", handleButtonClick);
    buttonGroup.appendChild(button);
}

root.appendChild(videoTag);
root.appendChild(buttonGroup);
