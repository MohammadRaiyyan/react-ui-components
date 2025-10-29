import { useCallback, useEffect, useRef, useState } from "react";

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const queryCache = new Map<string, CacheEntry<unknown>>();

type UseQueryProps<T> = {
  queryFn: (signal: AbortSignal) => Promise<T>;
  queryKey: (string | number | boolean)[];
  enabled?: boolean;
  staleTime?: number;
};

export default function useQuery<T>({
  queryFn,
  queryKey,
  enabled = true,
  staleTime = 0,
}: UseQueryProps<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<Error | null>(null);

  const controllerRef = useRef<AbortController | null>(null);
  const fetchIdRef = useRef(0);

  const cacheKey = JSON.stringify(queryKey);

  const fetchQuery = useCallback(
    async (signal: AbortSignal, force = false) => {
      const cached = queryCache.get(cacheKey) as CacheEntry<T> | undefined;
      const now = Date.now();

      if (!force && cached && now - cached.timestamp < staleTime) {
        setData(cached.data);
        return;
      }

      fetchIdRef.current++;
      const fetchId = fetchIdRef.current;

      setIsLoading(true);
      setIsError(null);

      try {
        const response = await queryFn(signal);
        if (fetchId !== fetchIdRef.current) return;

        queryCache.set(cacheKey, { data: response, timestamp: now });
        setData(response);
      } catch (e) {
        if (
          fetchId === fetchIdRef.current &&
          !(e instanceof DOMException && e.name === "AbortError")
        ) {
          setIsError(e as Error);
        }
      } finally {
        if (fetchId === fetchIdRef.current) setIsLoading(false);
      }
    },
    [queryFn, cacheKey, staleTime],
  );

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    fetchQuery(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchQuery, enabled, cacheKey]);

  const refetch = useCallback(() => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    return fetchQuery(controllerRef.current.signal, true);
  }, [fetchQuery]);

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
