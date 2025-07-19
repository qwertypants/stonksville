"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Chart } from "react-charts";
import { Card } from "@/components/retroui/Card";
import { StatsProps, Dividend, Seasonality, InsiderTrade } from "@/lib/types";

export default function Stats(props: StatsProps) {
  const { ticker, setResults } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

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

        if (!response.ok) {
          console.log(response.body);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data);
      } catch (err) {
        // @ts-ignore
        setError(err.message as string);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [ticker]);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{ticker}</div>;
}
