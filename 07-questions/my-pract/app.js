// opt 2 - using selectors inside the element
// opt 1 - traversing the dom (currently attempting below)


// select buttons
const btns = document.querySelectorAll('.question-btn');    // using All b.c. we have mutiple buttons

btns.forEach(function(btn){
    btn.addEventListener("click", function(el) {
        console.log(el.currentTarget.parentElement.parentElement);
        const question = el.currentTarget.parentElement.parentElement;
        question.classList.toggle("show-text");  // toggle seems to add/remove as relevant
    });
});