import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from './LanguageChart.module.scss';

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"];

const LanguagesChart = ({ languages }) => {
  if (!languages || Object.keys(languages).length === 0) {
    return <p className={styles.noLangText}>No languages data available.</p>;
  }

  const data = Object.entries(languages).map(([key, value]) => ({
    name: key,
    value,
  }));

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  const renderLabel = (entry) => {
    const percentage = ((entry.value / totalValue) * 100).toFixed(1);
    return `${percentage}%`;
  };

  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
        label={renderLabel}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default LanguagesChart;
