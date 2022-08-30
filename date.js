export function getDate() {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  const day = today.toLocaleDateString("en-US", options);
  return day;
}

export function getDay() {
  const today = new Date();
  const options = {
    weekday: "long"
  }
  const day = today.toLocaleDateString("en-US", options);
  return day;
}

//Above already export, so doesn't need to explicitly write 


// 1. Multiple each export function-------------------------
// export function getDay() {
//   const today = new Date();
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }

//   const day = today.toLocaleDateString("en-US", options);

//   return day;
// }

// export function getDate () {
//   const today = new Date();
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }

//   const day = today.toLocaleDateString("en-US", options);

//   return day;
// }

//On index.js
// import {getDay, getDate} from './date.js';
//----------------------------------

//2 Multiple export at last 1-------------------------------
// function getDate() {
//   const today = new Date();
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }
//   const day = today.toLocaleDateString("en-US", options);
//   return day;
// }

// function getDay() {
//   const today = new Date();
//   const options = {
//     weekday: "long"
//   }
//   const day = today.toLocaleDateString("en-US", options);
//   return day;
// }

// export {getDate, getDay}
//On index.js
// import {getDay, getDate} from './date.js';

// 3.Multiple export at last 2 using anonymous function-----------

// const getDate = () => {
//   const today = new Date();
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }
//   const day = today.toLocaleDateString("en-US", options);
//   return day;
// }

// const getDay = () => {
//   const today = new Date();
//   const options = {
//     weekday: "long"
//   }
//   const day = today.toLocaleDateString("en-US", options);
//   return day;
// }

// export {getDate, getDay}
//On index.js
// import {getDay, getDate} from './date.js';

//4.Only one-------------------------
// export default function () {
//   const today = new Date();
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }
//   const day = today.toLocaleDateString("en-US", options);
//   return day;
// }

//On index.js
//import getDay from './date.js';
// --------------------------------------

//5. Another way of only 1 module-----------
// const getDay = () => {
//   const today = new Date();
//   const options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   }
//   const day = today.toLocaleDateString("en-US", options);
//   return day;
// }
// export default getDay;

//On index.js
//import getDay from './date.js';
// ----------------------------------------




// These 5 case above works!!!


//Below don't work
// module.exports = getDay;
// module.exports = {
//   getDay,
//   getDate
// };

//Compare module.exports / exports(short version)
