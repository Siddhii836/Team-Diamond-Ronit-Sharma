import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { EmptyState } from '../components/shared/EmptyState';
import { Loader } from '../components/shared/Loader';
import { useWallet } from '../hooks/useWallet';
import { formatDate } from '../utils/formatDate';

export const SessionsPage = () => {
  const wallet = useWallet();
  const { fetchSessions } = wallet;
  const { sessionId: currentSessionId, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetchSessions();
  }, [fetchSessions]);

  const logoutAll = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="rounded-lg bg-danger px-3 py-2 text-sm text-white" onClick={() => void logoutAll()}>
          Logout All
        </button>
      </div>

      {loading ? <Loader label="Updating sessions..." /> : null}

      {wallet.sessions.length === 0 ? (
        <EmptyState title="No active sessions" subtitle="Active device sessions will appear here." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-card-dark">
          <table className="min-w-full text-sm text-slate-300">
            <thead className="text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3">Device</th>
                <th className="px-4 py-3">Browser</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Login Time</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {wallet.sessions.map((session) => (
                <tr key={session._id} className="border-t border-slate-800">
                  <td className="px-4 py-3">{session.device}</td>
                  <td className="px-4 py-3">{session.browser}</td>
                  <td className="px-4 py-3">{session.ip_address}</td>
                  <td className="px-4 py-3">{session.location}</td>
                  <td className="px-4 py-3">{formatDate(session.login_time)}</td>
                  <td className="px-4 py-3">
                    <button
                      className="rounded-md bg-danger px-3 py-1 text-xs text-white"
                      onClick={async () => {
                        setLoading(true);
                        try {
                          if (session._id === currentSessionId) {
                            await logout(session._id);
                            navigate('/login');
                          } else {
                            await wallet.removeSession(session._id);
                          }
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      Logout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
