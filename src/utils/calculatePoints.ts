import { Receipt } from "../middleware/schemas";

export const getPoints = (receipt: Receipt): number => {
  let totalPoints = 0;

  const receiptTotal = Number(receipt.total);

  totalPoints += countAlphanumeric(receipt.retailer);

  // +50 if total is an integer
  if (receiptTotal % 1 == 0) {
    totalPoints += 50;
  }

  // +25 if divisible by 0.25
  if (receiptTotal % 0.25 == 0) {
    totalPoints += 25;
  }

  for (let i = 0; i < receipt.items.length; i++) {
    // If description is a multiple of 3 multiply the price by 0.2 and round up to the nearest integer
    if (receipt.items[i].shortDescription.trim().length % 3 == 0) {
      totalPoints += Math.ceil(0.2 * Number(receipt.items[i].price));
    }

    // +5 for every 2 items
    if (i % 2 === 1) {
      totalPoints += 5;
    }
  }

  // 6 points if purchase day is odd
  const purchaseDate = new Date(receipt.purchaseDate);
  const purchaseDay = purchaseDate.getUTCDate();

  if (purchaseDay % 2 == 1) {
    totalPoints += 6;
  }

  // +10 if purchase time is between 2 PM and 4 PM
  if (isBetweenTwoAndFour(receipt.purchaseTime)) {
    totalPoints += 10;
  }

  return totalPoints;
};

function isBetweenTwoAndFour(purchaseTime: string) {
  const time = toMinutes(purchaseTime);
  const start = toMinutes("14:00");
  const end = toMinutes("16:00");

  return time > start && time < end;
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
function countAlphanumeric(str: string) {
  // Match all alphanumeric characters (letters and numbers)
  const matches = str.match(/[a-zA-Z0-9]/g);
  // Return the number of matches or 0 if no matches found
  return matches ? matches.length : 0;
}
