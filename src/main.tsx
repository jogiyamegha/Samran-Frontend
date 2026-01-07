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
import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider } from './app/modules/auth';
import { ToastContainer } from 'react-toastify';

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