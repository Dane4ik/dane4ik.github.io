console.log("Hello World!");

const menu = document.querySelector("#menu") as HTMLDivElement
const menuDropdown = document.querySelector("#menu > .dropdown") as HTMLDivElement;
const tabContainer = document.querySelector("#switching_tabs") as HTMLDivElement;

let currentTab = 0;

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function switchTab(tab: number) {
    if (tab == currentTab) return;

    let prevPad = currentTab;
    let prevTab = tabContainer.children[prevPad];
    let newTab = tabContainer.children[tab];

    prevTab.classList.add("hiding");
    newTab.classList.remove("hidden");
    newTab.classList.add("shown");

    await delay(500);

    prevTab.classList.remove("shown", "hiding");
    prevTab.classList.add("hidden");
    newTab.classList.remove("hiding", "hidden");
    currentTab = tab;
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
    el.addEventListener("click", async () => await switchTab(index));
});

function sizeTabs() {
    Array.from(tabContainer.children).forEach((e) => {
        const el = e as HTMLDivElement;
        el.style.minHeight = `${innerHeight - el.getBoundingClientRect().y}px`;
    });
}

sizeTabs();

addEventListener("resize", sizeTabs);