"use client";
import { useEffect, useState } from "react";
import React from "react";
import { StatsProps, ChartProps } from "@/lib/types";
import Charts from "@/components/charts";
import { Alert } from "@/components/retroui/Alert";
import Image from "next/image";

export default function Stats(props: StatsProps) {
  const { ticker, setStatResults, setChatContext } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [chartData, setChartData] = useState<ChartProps>();

  useEffect(() => {
    const fetchStats = async () => {
      const headers = new Headers();
      headers.append("accept", "application/json");
      headers.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        ticker,
        api_token: "9f7c75a9-28fc-4b9e-b3d5-9cbf46b13638",
      });

      try {
        const response = await fetch(
          `https://dev-api.agentsmyth.com/challenge/api/summary/${ticker}`,
          {
            method: "POST",
            headers,
            redirect: "follow",
            body: raw,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.detail);
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          setStatResults({
            ticker,
            data,
            show: true,
          });
          setChatContext({
            ticker,
            context: data.agent_response,
          });

          setChartData(data);
          console.log("Response data:", data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [setStatResults, ticker]);

  if (loading) return <div>Loading stats...</div>;
  if (error)
    return (
      <Alert>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description className="flex">
          <Image
            src="/error.png"
            alt="Stonksville"
            width={250}
            height={250}
            priority
          />
          {error}
        </Alert.Description>
      </Alert>
    );

  return <Charts ticker={ticker} data={chartData} />;
}
