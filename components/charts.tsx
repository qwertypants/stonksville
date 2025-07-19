import { Chart } from "react-charts";
import { Card } from "@/components/retroui/Card";
import { ChartProps, Dividend, Seasonality, InsiderTrade } from "@/lib/types";
import { Text } from "@/components/retroui/Text";

export default function Charts(props: ChartProps) {
  const { data, ticker } = props;
  // 1. Earnings: EPS vs Revenue (in billions)
  const earningsSeries = [
    {
      label: "EPS Actual / Estimate",
      data: [
        {
          primary: new Date(data.agent_sources.earnings.earnings_latest.date),
          secondary: data.agent_sources.earnings.earnings_latest.eps_actual,
        },
        {
          primary: new Date(data.agent_sources.earnings.earnings_next.date),
          secondary: data.agent_sources.earnings.earnings_next.eps_estimate,
        },
      ],
    },
    {
      label: "Revenue (B)",
      data: [
        {
          primary: new Date(data.agent_sources.earnings.earnings_latest.date),
          secondary:
            data.agent_sources.earnings.earnings_latest.revenue_actual / 1e9,
        },
        {
          primary: new Date(data.agent_sources.earnings.earnings_next.date),
          secondary:
            data.agent_sources.earnings.earnings_next.revenue_estimate / 1e9,
        },
      ],
    },
  ];

  // 2. Analyst Price Targets: average by date
  const ratingsByDate = data.agent_sources.analyst_ratings.reduce<
    Record<string, number[]>
  >((acc, { date, target }) => {
    const t = parseFloat(target);
    if (!isNaN(t)) {
      acc[date] = acc[date] || [];
      acc[date].push(t);
    }
    return acc;
  }, {});
  const analystSeries = [
    {
      label: "Avg Price Target",
      data: Object.entries(ratingsByDate).map(([date, targets]) => ({
        primary: new Date(date),
        secondary:
          targets.reduce((sum: number, v: number) => sum + v, 0) /
          targets.length,
      })),
    },
  ];

  // 3. Dividends: amount over time
  const dividendSeries = [
    {
      label: "Dividend Amount",
      data: data.agent_sources.dividends.map((d: Dividend) => ({
        primary: new Date(d.date),
        secondary: d.amount,
      })),
    },
  ];

  // 4. Congress Trades: count buys vs sells per date
  const tradesByDate = data.agent_sources.congress_trades.reduce<
    Record<string, { buy: number; sell: number }>
  >((acc, { tx_date, tx_type }) => {
    const d = tx_date;
    acc[d] = acc[d] || { buy: 0, sell: 0 };
    if (tx_type === "buy") {
      acc[d].buy += 1;
    } else if (tx_type === "sell") {
      acc[d].sell += 1;
    }
    return acc;
  }, {});
  const congressSeries = [
    {
      label: "Buys",
      data: Object.entries(tradesByDate).map(([date, { buy }]) => ({
        primary: new Date(date),
        secondary: buy,
      })),
    },
    {
      label: "Sells",
      data: Object.entries(tradesByDate).map(([date, { sell }]) => ({
        primary: new Date(date),
        secondary: sell,
      })),
    },
  ];

  // 5. Seasonality: average change by month (categorical)
  const seasonalitySeries = [
    {
      label: "Avg Monthly Change",
      data: data.agent_sources.seasonality.map((s: Seasonality) => ({
        primary: s.month,
        secondary: parseFloat(s.avg_change),
      })),
    },
  ];

  // 6. Insider Trades: shares traded over time
  const insiderSeries = [
    {
      label: "Insider Shares Traded",
      data: data.agent_sources.insider_trades.map((t: InsiderTrade) => ({
        primary: new Date(t.date),
        secondary: t.shares.raw,
      })),
    },
  ];

  return (
    <section className="relative pb-4 bg-gray-50 mb-2">
      <h1 className="p-2 sticky top-0 uppercase tracking-wider py-1 backdrop-blur bg-white/80">
        {ticker}
      </h1>
      <Text className="font-sans text-base p-2">{data.agent_response}</Text>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <Card.Header className="pb-0">
            <Card.Title className="text-sm m-0">
              Earnings: EPS vs Revenue
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-40">
              <Chart
                options={{
                  data: earningsSeries,
                  primaryAxis: {
                    getValue: (datum) => datum.primary,
                    scaleType: "time",
                  },
                  secondaryAxes: [{ getValue: (datum) => datum.secondary }],
                }}
              />
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="text-sm m-0">
              Analyst Price Targets
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-40">
              <Chart
                options={{
                  data: analystSeries,
                  primaryAxis: {
                    getValue: (datum) => datum.primary,
                    scaleType: "time",
                  },
                  secondaryAxes: [{ getValue: (datum) => datum.secondary }],
                }}
              />
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="text-sm m-0">Dividends Over Time</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-40">
              <Chart
                options={{
                  data: dividendSeries,
                  primaryAxis: {
                    getValue: (datum) => datum.primary,
                    scaleType: "time",
                  },
                  secondaryAxes: [{ getValue: (datum) => datum.secondary }],
                }}
              />
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="text-sm m-0">
              Congress Trades (Count)
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-40">
              <Chart
                options={{
                  data: congressSeries,
                  primaryAxis: {
                    getValue: (datum) => datum.primary,
                    scaleType: "time",
                  },
                  secondaryAxes: [{ getValue: (datum) => datum.secondary }],
                }}
              />
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="text-sm m-0">
              Seasonality (Avg Change)
            </Card.Title>
          </Card.Header>
          <Card.Content className="h-40">
            <Chart
              options={{
                data: seasonalitySeries,
                primaryAxis: {
                  getValue: (datum) => datum.primary,
                  scaleType: "band",
                },
                secondaryAxes: [{ getValue: (datum) => datum.secondary }],
              }}
            />
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title className="text-sm m-0">
              Insider Trades: Shares
            </Card.Title>
          </Card.Header>
          <Card.Content className="h-40">
            <Chart
              options={{
                data: insiderSeries,
                primaryAxis: {
                  getValue: (datum) => datum.primary,
                  scaleType: "time",
                },
                secondaryAxes: [{ getValue: (datum) => datum.secondary }],
              }}
            />
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
