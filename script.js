const toggleMenu = () => {
    // targetting the entire menu-links element and hamburger-icon
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // adds or removes that open class 
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}