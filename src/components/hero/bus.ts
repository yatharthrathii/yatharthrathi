// A tiny event bus that links the three parts of the hero:
// the request card (frontend), the portrait's API line, and the terminal (backend).
export type Method = "GET" | "POST";

/** One route for both methods: GET asks for a hello, POST sends one. */
export const ENDPOINT = "/api/hello";

export type HeroEvent =
  | { type: "request"; method: Method }
  | { type: "response"; method: Method; label: string; ms: number; body: string };

const listeners = new Set<(e: HeroEvent) => void>();

export function emit(e: HeroEvent) {
  listeners.forEach((fn) => fn(e));
}

export function subscribe(fn: (e: HeroEvent) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
