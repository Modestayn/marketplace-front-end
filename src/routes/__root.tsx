import { createRootRoute } from '@tanstack/react-router';
import { App } from '../App.tsx';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <App />
      {import.meta.env.VITE_DEBUG_MODE && <TanStackRouterDevtools />}
    </>
  ),
});
