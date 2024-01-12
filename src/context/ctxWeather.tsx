import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface Weather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

interface CtxWeatherContextProps {
  ctxWeather: Weather | null;
  setCtxWeather: Dispatch<SetStateAction<Weather | null>>;
}

const CtxWeatherContext = createContext<CtxWeatherContextProps>({
  ctxWeather: null,
  setCtxWeather: () => {},
});

export default function CtxWeatherProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ctxWeather, setCtxWeather] = useState<Weather | null>(null);

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
