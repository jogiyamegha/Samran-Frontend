import { createRoot } from 'react-dom/client';
// Axios
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { QueryClient, QueryClientProvider } from 'react-query';
// Apps
import { CustomerServicei18nProvider } from './_admin/i18n/CustomerServicei18n';
import './_admin/assets/sass/style.react.scss';
import 'react-toastify/dist/ReactToastify.css';
import './_admin/assets/sass/style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Tailwind CSS - Import last to ensure utilities override framework styles
import './index.css';
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider, getAuth } from './app/modules/auth';
import { ToastContainer } from 'react-toastify';
import { BASE_URL } from './utils/constants';

// Configure axios defaults
axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(
    (config) => {
        const auth = getAuth();
        if (auth?.token) {
            config.headers.Authorization = `Bearer ${auth.token}`;
        }
        config.headers['platform'] = 'web';
        config.headers['ngrok-skip-browser-warning'] = '69420';
        return config;
    },
    (error) => Promise.reject(error)
);

Chart.register(...registerables);

const queryClient = new QueryClient();
const container = document.getElementById('root');

if (container) {
    createRoot(container).render(
        <QueryClientProvider client={queryClient}>
            <CustomerServicei18nProvider>
                <AuthProvider>
                    <ToastContainer />
                    <AppRoutes />
                </AuthProvider>
            </CustomerServicei18nProvider>
        </QueryClientProvider>
    )
}