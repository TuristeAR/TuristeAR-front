export interface FormData {
  provinces: Province[];
  localities: Locality[];
  events: number[];
  fromDate: string;
  toDate: string;
  priceLevel: string[];
  types: string[];
  company: number | null;
}

export interface Province {
  id: number;
  name: string;
  georefId: string;
}

export interface Locality {
  name: string;
  province: Province;
}
