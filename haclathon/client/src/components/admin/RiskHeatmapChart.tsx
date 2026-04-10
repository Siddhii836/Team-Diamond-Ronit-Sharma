import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface RiskBucket {
  bucket: string;
  count: number;
}

export const RiskHeatmapChart = ({ data }: { data: RiskBucket[] }) => {
  return (
    <section className="rounded-2xl border border-slate-700 bg-card-dark p-6">
      <h3 className="mb-3 text-lg font-semibold text-white">Risk Heatmap</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="bucket" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="count" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
