import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css';
import { AuthProvider } from './store/Auth.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
// run in chrome =npm run dev