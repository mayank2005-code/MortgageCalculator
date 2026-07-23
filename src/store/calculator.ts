import { create } from 'zustand';
import { Currency } from '@/models/Calculation';

export type CalculatorTab = 'mortgage' | 'rent' | 'prorated_rent';

interface CalculatorState {
  // Global currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;

  // Active tab
  activeTab: CalculatorTab;
  setActiveTab: (tab: CalculatorTab) => void;

  // Refresh trigger for saved calculations
  refreshTrigger: number;
  triggerRefresh: () => void;

  // Mortgage inputs
  mortgageInputs: {
    principal: number;
    downPayment: number;
    interestRate: number;
    tenure: number;
  };
  setMortgageInputs: (inputs: Partial<CalculatorState['mortgageInputs']>) => void;

  // Rent inputs
  rentInputs: {
    monthlyRent: number;
  };
  setRentInputs: (inputs: Partial<CalculatorState['rentInputs']>) => void;

  // Prorated rent inputs
  proratedRentInputs: {
    monthlyRent: number;
    moveInDate: string;
    daysOccupied: number;
  };
  setProratedRentInputs: (inputs: Partial<CalculatorState['proratedRentInputs']>) => void;

  // Load calculation
  loadCalculation: (type: CalculatorTab, inputs: unknown, currency: Currency) => void;
}

const useCalculatorStore = create<CalculatorState>((set) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),

  activeTab: 'mortgage',
  setActiveTab: (activeTab) => set({ activeTab }),

  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),

  mortgageInputs: {
    principal: 500000,
    downPayment: 100000,
    interestRate: 7.5,
    tenure: 20,
  },
  setMortgageInputs: (inputs) =>
    set((state) => ({
      mortgageInputs: { ...state.mortgageInputs, ...inputs },
    })),

  rentInputs: {
    monthlyRent: 2000,
  },
  setRentInputs: (inputs) =>
    set((state) => ({
      rentInputs: { ...state.rentInputs, ...inputs },
    })),

  proratedRentInputs: {
    monthlyRent: 2000,
    moveInDate: new Date().toISOString().split('T')[0],
    daysOccupied: 15,
  },
  setProratedRentInputs: (inputs) =>
    set((state) => ({
      proratedRentInputs: { ...state.proratedRentInputs, ...inputs },
    })),

  loadCalculation: (type, inputs, currency) =>
    set((state) => {
      const updates: Partial<CalculatorState> = {
        activeTab: type,
        currency,
      };

      if (type === 'mortgage' && typeof inputs === 'object' && inputs !== null) {
        updates.mortgageInputs = { ...state.mortgageInputs, ...(inputs as Partial<typeof state.mortgageInputs>) };
      } else if (type === 'rent' && typeof inputs === 'object' && inputs !== null) {
        updates.rentInputs = { ...state.rentInputs, ...(inputs as Partial<typeof state.rentInputs>) };
      } else if (type === 'prorated_rent' && typeof inputs === 'object' && inputs !== null) {
        updates.proratedRentInputs = { ...state.proratedRentInputs, ...(inputs as Partial<typeof state.proratedRentInputs>) };
      }

      return updates;
    }),
}));

export default useCalculatorStore;
