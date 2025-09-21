import { createRoot } from 'react-dom/client';

import './dashboard.scss';

import { dashboardInfo } from './utils/data';
import App from './Component/App';

document.addEventListener('DOMContentLoaded', () => {
    const dashboardEl = document.getElementById("vgbDashboard");
    const info = JSON.parse(dashboardEl.dataset.info);

    createRoot(dashboardEl).render(<App {...dashboardInfo(info)} />);
});