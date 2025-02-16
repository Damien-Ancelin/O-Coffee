const containerElement = document.querySelector(".products__container")

const handleLoad = function() {
    const howManyChildren = containerElement.children.length;
    if(howManyChildren === 1){
        containerElement.children[0].className = "products__card--aloneOnPage";
    }
}

export const init = function (){
    if(containerElement){
        window.addEventListener("load", handleLoad);
    }
}