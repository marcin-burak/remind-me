import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './theme';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts';
import { RemindersPage, SettingsPage } from './pages';

export const navigation = {
	reminders: "/reminders",
	settings: "/settings"
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route path="" element={<Navigate to={navigation.reminders} />} />
						<Route path={navigation.reminders} element={<RemindersPage />} />
						<Route path={navigation.settings} element={<SettingsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);