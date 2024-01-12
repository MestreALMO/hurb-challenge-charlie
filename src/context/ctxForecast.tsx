import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ctxForecastContextProps {
  ctxTomorrow: number | null;
  setCtxTomorrow: Dispatch<SetStateAction<number | null>>;
  ctxAfterTomorrow: number | null;
  setCtxAfterTomorrow: Dispatch<SetStateAction<number | null>>;
}

const CtxForecastContext = createContext<ctxForecastContextProps>(
  {} as ctxForecastContextProps
);

export default function CtxForecastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ctxTomorrow, setCtxTomorrow] = useState<number | null>(null);
  const [ctxAfterTomorrow, setCtxAfterTomorrow] = useState<number | null>(null);

  return (
    <CtxForecastContext.Provider
      value={{
        ctxTomorrow,
        setCtxTomorrow,
        ctxAfterTomorrow,
        setCtxAfterTomorrow,
      }}
    >
      {children}
    </CtxForecastContext.Provider>
  );
}

export const useCtxForecast = () => {
  const context = useContext(CtxForecastContext);
  const { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow } =
    context;
  return { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow };
};
