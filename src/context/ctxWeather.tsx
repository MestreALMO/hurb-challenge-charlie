import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ctxWeatherContextProps {
  ctxWeather: string;
  setCtxWeather: Dispatch<SetStateAction<string>>;
}

const CtxWeatherContext = createContext<ctxWeatherContextProps>(
  {} as ctxWeatherContextProps
);

export default function CtxWeatherProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ctxWeather, setCtxWeather] = useState("");

  return (
    <CtxWeatherContext.Provider value={{ ctxWeather, setCtxWeather }}>
      {children}
    </CtxWeatherContext.Provider>
  );
}

export const useCtxWeather = () => {
  const context = useContext(CtxWeatherContext);
  const { ctxWeather, setCtxWeather } = context;
  return { ctxWeather, setCtxWeather };
};
