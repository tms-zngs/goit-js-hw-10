import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const solution = document.querySelector(".form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;
    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            state === "fulfilled" ? resolve(delay) : reject(delay);
        }, delay);
    })

    promise
        .then((delay) => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
});
        })
        .catch((delay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight",
            })

        
    })
    form.reset();
})
