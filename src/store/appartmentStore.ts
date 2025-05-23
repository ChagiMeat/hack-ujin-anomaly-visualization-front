import {makeAutoObservable} from "mobx";
import ApartmentService, {
  GetDeviceSignalsParamsI,
  GetDeviceSignalsResponseI,
  SignalItemI,
  SignalsDataI
} from "../api/getDeviceInfo.ts";
import {ApartmentI} from "../pages/account/MainPage/MainPage.tsx";

class ApartmentStore {
  statusesMap: Map<number, number> = new Map();
  isLoading = false;
  private allData: GetDeviceSignalsResponseI | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getIntencityColor(intencity: number): string {
    if (intencity < 0) return 'green';
    if (intencity < 5) return 'yellow';
    if (intencity < 10) return 'orange';
    return 'red';
  }

   async fetchStatusesMap(apartments: ApartmentI[]): Promise<void> {
    this.isLoading = true;
    try {
      const requests = apartments.map(apartment => ApartmentService.getApartmentDevices({apartmentId: apartment.apartmentId, eg: apartment.eg}));
      const apartmentsSignals = await Promise.all(requests);

      const statusesMap = new Map<number, number>();
      apartmentsSignals.forEach(apart => {
        let biggestSignal = 0;
        for(const signalKey in apart.data.data.signals) {
          const signals = apart.data.data.signals[signalKey];
          signals.forEach(signal => {
            if(signal.intensity > biggestSignal) biggestSignal = signal.intensity;
          })
        }
        statusesMap.set(Number(apart.data.data.apartment.apartment_id), biggestSignal);
      });

      this.isLoading = false;
      this.statusesMap = statusesMap;
    } catch (e) {
      this.isLoading = false;
      throw new Error('Error while fetching statuses map');
    }
  }

  get allSerialNumbers(): string[] {
    return Object.keys(this.allData?.data.signals ?? {});
  }

  get allDevices(): SignalsDataI | undefined {
    return this.allData?.data.signals
  }

  get allDevicesSignals(): SignalItemI[] {
    const result: SignalItemI[] = [];

    this.allSerialNumbers.forEach(serialNumber => {
      const devices = this.allData?.data.signals[serialNumber]
      if (devices) result.push(...devices);
    })
    return result;
  }

  async fetchApartmentDevices(params: GetDeviceSignalsParamsI): Promise<void> {
    this.isLoading = true;
    try {
      const response = await ApartmentService.getApartmentDevices(params);
      this.allData = response.data;
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      throw new Error('Error while fetching apartment devices');
    }
  }
}

export default new ApartmentStore();
