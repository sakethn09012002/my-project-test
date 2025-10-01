import { signOut } from '../../features/auth/actions/signOut';
import * as auth from '@/auth';

jest.mock('@/auth', () => ({
  signOut: jest.fn(() => Promise.resolve()),
}));

describe('signOut function', () => {
  it('calls authSignOut', async () => {
    await signOut(); // call the function
    expect(auth.signOut).toHaveBeenCalled(); // assert the underlying auth signOut is called
  });
});
