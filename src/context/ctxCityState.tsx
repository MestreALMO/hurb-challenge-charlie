import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ctxCityStateContextProps {
  ctxCity: string;
  setCtxCity: Dispatch<SetStateAction<string>>;
  ctxState: string;
  setCtxState: Dispatch<SetStateAction<string>>;
}

const CtxCityStateContext = createContext<ctxCityStateContextProps>(
  {} as ctxCityStateContextProps
);

export default function CtxCityStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ctxCity, setCtxCity] = useState("");
  const [ctxState, setCtxState] = useState("");

  return (
    <CtxCityStateContext.Provider
      value={{ ctxCity, setCtxCity, ctxState, setCtxState }}
    >
      {children}
    </CtxCityStateContext.Provider>
  );
}

export const useCtxCityState = () => {
  const context = useContext(CtxCityStateContext);
  const { ctxCity, setCtxCity, ctxState, setCtxState } = context;
  return { ctxCity, setCtxCity, ctxState, setCtxState };
};
