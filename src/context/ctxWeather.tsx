import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ctxWeatherData {
  main: { temp: string; humidity: string };
  weather: [{ description: string }];
  wind: { speed: string };
}

interface ctxWeatherContextProps {
  ctxWeather: ctxWeatherData;
  setCtxWeather: Dispatch<SetStateAction<ctxWeatherData>>;
}

const CtxWeatherContext = createContext<ctxWeatherContextProps>(
  {} as ctxWeatherContextProps
);

export default function CtxWeatherProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ctxWeather, setCtxWeather] = useState({} as ctxWeatherData);

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
