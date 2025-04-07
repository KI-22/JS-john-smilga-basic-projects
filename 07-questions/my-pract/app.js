// // // // // // // // // // // // //
// // opt 1 - traversing the dom // //
// // // // // // // // // // // // //


// // select buttons
// const btns = document.querySelectorAll('.question-btn');    // using All b.c. we have mutiple buttons

// btns.forEach(function(btn){
//     btn.addEventListener("click", function(el) {
//         // console.log(el.currentTarget.parentElement.parentElement);
//         const question = el.currentTarget.parentElement.parentElement;
//         question.classList.toggle("show-text");  // toggle seems to add/remove as relevant
//     });
// });


// // NOTE: above works but shows all FAQs, not one at a time. 
// //       Not option given, tried briefly myself and not sure how would go about it.



// // // // // // // // // // // // // // // // // // //
// // opt 2 - using selectors inside the element  // //
// // // // // // // // // // // // // // // // // // //

const questions = document.querySelectorAll('.question');

questions.forEach(function(question) {
    // console.log(question);
    const btn = question.querySelector('.question-btn');    // not using document as we don't want to seelct all the buttons (~?)
    // console.log(btn);
    btn.addEventListener("click", function() {

        // // my attempt // //
        // questions.forEach(function(item){      // 'item' is the same as 'question' above, we've just called it something different
        //     if (item.classList.contains("show-text") && item != question){
        //         item.classList.toggle("show-text");
        //     }
        // });

        // // reformatted (tutorials version) // //
        questions.forEach(function(item){
            if (item != question){
                item.classList.remove("show-text");
            };
        });

        question.classList.toggle("show-text");
    });
});
