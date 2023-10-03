export interface SharedState {
  showloading: boolean;
  errorMessage: string;
}

export const initialState: SharedState = {
  showloading: false,
  errorMessage: '',
};
