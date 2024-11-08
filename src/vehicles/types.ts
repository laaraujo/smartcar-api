export type Vehicle = {
  vin: string;
  color: string;
  doorCount: number;
  driveTrain: string;
};

export type Door = {
  location: string;
  locked: boolean;
};

export type FuelOrBattery = {
  percent: number;
};
