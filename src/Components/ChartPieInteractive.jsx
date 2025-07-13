'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const description = 'An interactive pie chart';

// Helper function to generate chart colors
const generateChartConfig = (data, valueKey = 'feedbacks') => {
    const config = {
        feedbacks: {
            label: 'Feedbacks',
        },
        [valueKey]: {
            label: valueKey.charAt(0).toUpperCase() + valueKey.slice(1),
        },
    };

    // Generate color configuration for each data type
    data.forEach((item, index) => {
        config[item.type] = {
            label: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            color: `var(--chart-${index + 1})`,
        };
    });

    return config;
};

// Helper function to prepare data with fill colors
const prepareData = (data, valueKey = 'feedbacks') => {
    return data.map((item, index) => ({
        ...item,
        fill: `var(--color-${item.type})`,
        [valueKey]: item[valueKey] || item.value || 0, // Support different value key names
    }));
};

export function ChartPieInteractive({
    data = [],
    valueKey = 'feedbacks',
    title = 'Pie Chart - Interactive',
    description = 'Interactive pie chart',
    centerLabel = 'Visitors',
}) {
    const id = 'pie-interactive';

    // Prepare data and config
    const chartData = React.useMemo(() => prepareData(data, valueKey), [data, valueKey]);
    const chartConfig = React.useMemo(() => generateChartConfig(data, valueKey), [data, valueKey]);

    const [activeType, setActiveType] = React.useState(chartData[0]?.type || '');

    const activeIndex = React.useMemo(
        () => chartData.findIndex((item) => item.type === activeType),
        [activeType, chartData]
    );

    const types = React.useMemo(() => chartData.map((item) => item.type), [chartData]);

    // Handle empty data
    if (!data || data.length === 0) {
        return (
            <>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>No data available</CardDescription>
                </CardHeader>
            </>
        );
    }

    return (
        <>
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 p-0">
                <div className="grid gap-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <Select value={activeType} onValueChange={setActiveType}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {types.map((key) => {
                            const config = chartConfig[key];

                            if (!config) {
                                return null;
                            }

                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: `var(--color-${key})`,
                                            }}
                                        />
                                        {config?.label}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey={valueKey}
                            nameKey="type"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {chartData[activeIndex]?.[
                                                        valueKey
                                                    ]?.toLocaleString() || '0'}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {centerLabel}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </>
    );
}

// Example usage:
// const myData = [
//     { type: 'january', feedbacks: 186 },
//     { type: 'february', feedbacks: 305 },
//     { type: 'march', feedbacks: 237 }
// ];
//
// <ChartPieInteractive
//     data={myData}
//     valueKey="feedbacks"
//     title="Monthly Visitors"
//     description="January - March 2024"
//     centerLabel="Visitors"
// />
