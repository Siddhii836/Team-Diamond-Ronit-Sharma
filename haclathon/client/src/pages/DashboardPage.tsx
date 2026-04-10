import { useState } from 'react';
import { WalletBalanceCard } from '../components/wallet/WalletBalanceCard';
import { QuickActions } from '../components/wallet/QuickActions';
import { RecentTransactions } from '../components/wallet/RecentTransactions';
import { RiskScoreGauge } from '../components/wallet/RiskScoreGauge';
import { SecurityStatus } from '../components/wallet/SecurityStatus';
import { SendMoneyModal } from '../components/wallet/SendMoneyModal';
import { useWallet } from '../hooks/useWallet';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const wallet = useWallet();
  const [showSend, setShowSend] = useState(false);

  const onToggleLock = async () => {
    if (user?.security_lock_enabled) {
      const password = window.prompt('Enter password to disable security lock:');
      await wallet.toggleSecurityLock(false, password || undefined);
    } else {
      await wallet.toggleSecurityLock(true);
    }
  };

  return (
    <div className="space-y-6">
      <WalletBalanceCard
        balance={wallet.balance}
        isFrozen={Boolean(user?.account_frozen)}
        lockEnabled={Boolean(user?.security_lock_enabled)}
        onToggleLock={() => void onToggleLock()}
      />

      <QuickActions
        onSend={() => setShowSend(true)}
        onDownload={() => {
          const latest = wallet.transactions[0];
          if (!latest) {
            window.dispatchEvent(new CustomEvent('app-toast', { detail: { type: 'info', message: 'No receipt available yet.' } }));
            return;
          }
          void wallet.downloadReceipt(latest.id);
        }}
      />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <RecentTransactions transactions={wallet.transactions} />
        <div className="space-y-6">
          <RiskScoreGauge score={user?.risk_score || 0} />
          <SecurityStatus
            lockEnabled={Boolean(user?.security_lock_enabled)}
            sessions={wallet.sessions.length}
            kycVerified={Boolean(user?.kyc_verified)}
          />
        </div>
      </div>

      <SendMoneyModal
        open={showSend}
        onClose={() => setShowSend(false)}
        riskScore={user?.risk_score || 0}
        loading={wallet.loading}
        onSubmit={async ({ receiverEmail, amount, note, pin }) => {
          const pinVerify = await wallet.verifyPin(pin);
          await wallet.sendMoney({
            receiverEmail,
            amount,
            note,
            pinToken: pinVerify.pinToken
          });
        }}
      />
    </div>
  );
};
