import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface TrendPoint {
  day: string;
  reports: number;
}

export const FraudTrendChart = ({ data }: { data: TrendPoint[] }) => {
  return (
    <section className="rounded-2xl border border-slate-700 bg-card-dark p-6">
      <h3 className="mb-3 text-lg font-semibold text-white">Fraud Trend (30 days)</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="reports" stroke="#6366F1" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
