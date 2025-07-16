import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A linear line chart';

const chartData = [
    // { month: 'January', feedbacks: 186 },
    // { month: 'February', feedbacks: 305 },
    // { month: 'March', feedbacks: 237 },
    // { month: 'April', feedbacks: 73 },
    // { month: 'May', feedbacks: 209 },
    // { month: 'June', feedbacks: 214 },
    { month: 'Sunday', feedbacks: 3 },
    { month: 'Monday', feedbacks: 7 },
    { month: 'Tuesday', feedbacks: 2 },
    { month: 'Wednesday', feedbacks: 3 },
    { month: 'Thursday', feedbacks: 0 },
    { month: 'Friday', feedbacks: 0 },
    { month: 'Saturday', feedbacks: 0 },
];

const chartConfig = {
    feedbacks: {
        label: 'Feedbacks',
        color: 'var(--chart-1)',
    },
};

export function ChartLineLinear() {
    return (
        <>
            <CardHeader className="p-0">
                <CardTitle>Line Chart - Linear</CardTitle>
                <CardDescription>Sunday - Saturday Week 21</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line
                            dataKey="feedbacks"
                            type="linear"
                            stroke="var(--color-feedbacks)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="p-0 flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </>
    );
}
