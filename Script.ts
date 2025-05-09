console.log("Hello World!");

const menu = document.querySelector("#menu") as HTMLDivElement
const menuDropdown = document.querySelector("#menu > .dropdown") as HTMLDivElement;
const tabContainer = document.querySelector("#switching_tabs") as HTMLDivElement;

let currentPad = 0;

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function switchpad(pad: number) {
    if (pad == currentPad) return;

    let prevPad = currentPad;
    let prevTab = tabContainer.children[prevPad];
    let newTab = tabContainer.children[pad];

    prevTab.classList.add("hiding")
    newTab.classList.add("shown");

    await delay(500);

    prevTab.classList.remove("shown");
    prevTab.classList.remove("hiding");
    prevTab.classList.add("hidden");
    newTab.classList.remove("hiding");

    currentPad = pad;
}

menu.addEventListener("click", async () => {
    if (menuDropdown.classList.contains("hidden")) {
        menuDropdown.classList.remove("hidden");
    } else {
        menuDropdown.classList.add("hiding");
        await delay(500);
        menuDropdown.classList.add("hidden");
        menuDropdown.classList.remove("hiding");
    }
});

menuDropdown.querySelectorAll(".item").forEach((el, index) => {
    el.addEventListener("click", async () => await switchpad(index));
});

