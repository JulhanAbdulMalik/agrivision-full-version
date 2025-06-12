const Swal = require('sweetalert2');

export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

// showFormattedDate('2025-05-13', 'id-ID')
// Output: "13 Mei 2025"

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// async function run() {
//   console.log("Start");
//   await sleep(2000); // tunggu 2 detik
//   console.log("End after 2 seconds");
// }

// run();

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const showToast = (icon = 'success', title = 'Berhasil') => {
  toast.fire({ icon, title });
};

export { showToast };
