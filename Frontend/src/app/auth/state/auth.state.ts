import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/User.model';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null,
};
