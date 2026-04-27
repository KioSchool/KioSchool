import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface RawQueryParamConfig {
  key: string;
  getDefault: () => string;
}

export interface TypedQueryParamConfig<T> {
  key: string;
  parse: (raw: string | null) => T | null;
  serialize: (value: T) => string;
  getDefault: () => T;
}

type AnyQueryParamConfig<T> = RawQueryParamConfig | TypedQueryParamConfig<T>;

function hasCodec<T>(config: AnyQueryParamConfig<T>): config is TypedQueryParamConfig<T> {
  return 'parse' in config && 'serialize' in config;
}

function normalize<T>(config: AnyQueryParamConfig<T>): TypedQueryParamConfig<T> {
  if (hasCodec(config)) return config;
  return {
    key: config.key,
    parse: (raw) => raw as T | null,
    serialize: (value) => value as unknown as string,
    getDefault: config.getDefault as () => T,
  };
}

function useQueryParam<T = string>(config: AnyQueryParamConfig<T>): { value: T; setValue: (next: T) => void } {
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ key, parse, serialize, getDefault }] = useState(() => normalize(config));

  const raw = searchParams.get(key);
  const parsed = useMemo(() => parse(raw), [raw, parse]);
  const value = useMemo(() => parsed ?? getDefault(), [parsed, getDefault]);

  useEffect(() => {
    if (parsed !== null) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, serialize(getDefault()));
        return next;
      },
      { replace: true },
    );
  }, [parsed, key, serialize, getDefault, setSearchParams]);

  const setValue = useCallback(
    (next: T) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.set(key, serialize(next));
          return params;
        },
        { replace: false },
      );
    },
    [key, serialize, setSearchParams],
  );

  return { value, setValue };
}

export default useQueryParam;
