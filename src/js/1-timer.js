import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('[data-start]');
const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

const input = document.querySelector("#datetime-picker");

let userSelectedDate;

startButton.disabled = true;
let isTimerActive = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function (selectedDates) {
        if (selectedDates.length > 0) {
            if (selectedDates[0] < new Date()) {
                iziToast.error({
                    message: 'Please choose a date in the future',
                    layout: 2,
                    position: 'topRight',
                });
                startButton.disabled = true;
                startButton.classList.add('disabled');
            } else {
                userSelectedDate = selectedDates[0];
                console.log(`Selected Date: ${userSelectedDate}`);
                startButton.disabled = false;
                startButton.classList.remove('disabled');
            }
        }
    }
    
};

flatpickr(input, options);

class Timer {

 constructor(timerFields) {
     this.intervalId = null;
     this.timerFields = timerFields;
  }




    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
    }
    
    updateUi(time) {
        this.timerFields.days.textContent = time.days.toString().padStart(2, "0");
        this.timerFields.hours.textContent = time.hours.toString().padStart(2, "0");
        this.timerFields.minutes.textContent = time.minutes.toString().padStart(2, "0");
        this.timerFields.seconds.textContent = time.seconds.toString().padStart(2, "0");
}

    start(selectedDate) {
        if (isTimerActive) {
            return;
        }
      isTimerActive = true;
      
      input.setAttribute('disabled', 'true');

        this.intervalId = setInterval(() => {
            const now = new Date();
            const timeLeft = selectedDate - now;

            if (timeLeft <= 0) {
                this.stop();
                return;
            }

            const timeComponents = this.convertMs(timeLeft);
            this.updateUi(timeComponents);
            console.log(timeComponents);
        }, 1000)

        iziToast.success({
      message: 'Timer started successfully!',
      layout: 2,
      position: 'topRight',
    });
    }

    stop() {
        clearInterval(this.intervalId);
      isTimerActive = false;
      startButton.disabled = false;
      startButton.classList.remove('disabled');

      input.removeAttribute('disabled');

      iziToast.success({
      message: 'Timer has ended!',
      layout: 2,
      position: 'topRight',
    });
    }
    
}

const timer = new Timer(timerFields);
startButton.addEventListener("click", () => {
  if (userSelectedDate) {
    timer.start(userSelectedDate);
      startButton.disabled = true;
      startButton.classList.add('disabled');
  }
});
