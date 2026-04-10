interface Props {
  onSend: () => void;
  onDownload: () => void;
}

export const QuickActions = ({ onSend, onDownload }: Props) => {
  const base = 'rounded-xl px-4 py-3 text-sm font-semibold transition hover:opacity-90';

  return (
    <section className="rounded-2xl border border-slate-700 bg-card-dark p-6">
      <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button className={`${base} bg-primary text-white`} onClick={onSend}>Send Money</button>
        <button className={`${base} bg-success text-white`} onClick={onDownload}>Download Receipt</button>
      </div>
    </section>
  );
};
