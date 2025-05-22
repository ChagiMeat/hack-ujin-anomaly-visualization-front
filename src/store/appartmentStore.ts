import {makeAutoObservable} from "mobx";
import ApartmentService, {
  GetDeviceSignalsParamsI,
  GetDeviceSignalsResponseI,
  SignalItemI
} from "../api/getDeviceInfo.ts";

class ApartmentStore {
  private allData: GetDeviceSignalsResponseI | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getIntencityColor(intencity: number): string {
    if (intencity < 0) return 'green';
    if (intencity < 5) return 'yellow';
    if (intencity < 10) return 'orange';
    return 'red';
  }

  get allSerialNumbers(): number[] {
    return Object.keys(this.allData?.data.signals ?? {}).map(Number);
  }

  get allDevicesSignals(): SignalItemI[] {
    const result: SignalItemI[] = [];

    this.allSerialNumbers.forEach(serialNumber => {
      const devices = this.allData?.data.signals[serialNumber]
      if(devices) result.push(...devices);
    })
    return result;
  }

  async fetchApartmentDevices(params: GetDeviceSignalsParamsI): Promise<void>{
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
