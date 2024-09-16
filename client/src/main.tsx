import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider } from "react-redux";
import appStore from "./store/app-store.ts";
import { SocketProvider } from "./contexts/socket.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <SocketProvider>
      <App />
      <Toaster closeButton />
    </SocketProvider>
  </Provider>,
);
