const dataBase: any = {};

export const postReceiptPoints = (id: string, points: number) => {
  dataBase[id] = points;
};

export const getReceiptPoints = (id: string) => {
  return dataBase[id];
};
