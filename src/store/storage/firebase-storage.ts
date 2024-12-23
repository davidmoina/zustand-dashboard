import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

// Cache para almacenar resultados
const cache = new Map<string, { data: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60; // 1 minuto

// Controlador para peticiones pendientes
const pendingRequests = new Map<string, AbortController>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const storage: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      // Verificar caché
      const cached = cache.get(name);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }

      const response = await fetch(`${firebaseUrl}/${name}.json`);
      const data = await response.json();
      const stringifiedData = JSON.stringify(data);

      // Actualizar caché
      cache.set(name, { data: stringifiedData, timestamp: Date.now() });

      return stringifiedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  setItem: debounce(async function (
    name: string,
    value: string
  ): Promise<void> {
    try {
      // Cancelar petición anterior si existe
      if (pendingRequests.has(name)) {
        pendingRequests.get(name)?.abort();
      }

      // Crear nuevo controlador
      const controller = new AbortController();
      pendingRequests.set(name, controller);

      await fetch(`${firebaseUrl}/${name}.json`, {
        method: "PUT",
        body: value,
        signal: controller.signal,
      });

      // Actualizar caché después de una escritura exitosa
      cache.set(name, { data: value, timestamp: Date.now() });
      pendingRequests.delete(name);
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        console.log("Petición de actualización abortada");
        return;
      }
      console.error(error);
      throw error;
    }
  },
  500), // 500ms de debounce

  removeItem: async function (name: string): Promise<void> {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: "DELETE",
      });
      // Limpiar caché después de eliminar
      cache.delete(name);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const firebaseStorage = createJSONStorage(() => storage);
