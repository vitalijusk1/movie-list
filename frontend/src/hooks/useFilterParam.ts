import { useSearchParams } from "react-router-dom";

const useFilterParam = (name: string, defaultValue = "") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(name) ?? defaultValue;

  const setValue = (nextValue: string) => {
    const next = new URLSearchParams(searchParams);

    if (nextValue && nextValue !== defaultValue) {
      next.set(name, nextValue);
    } else {
      next.delete(name);
    }

    next.set("page", "1");
    setSearchParams(next);
  };

  return [value, setValue] as const;
};

export default useFilterParam;
