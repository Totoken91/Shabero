import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import DeleteAccountPage from './components/DeleteAccountPage'
import { AuthProvider } from './lib/auth'
import { Capacitor } from '@capacitor/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'

// Initialiser Google Auth au démarrage
if (Capacitor.isNativePlatform()) {
  GoogleAuth.initialize({
    clientId: '1056175212463-c109qc6elb1vben9tglhnqt94bk60pam.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  })
}

const isDeletePage = window.location.pathname === '/delete-account'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDeletePage ? (
      <DeleteAccountPage />
    ) : (
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    )}
  </StrictMode>,
)
