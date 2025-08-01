import { useState, useEffect } from "react";
import Odometer from "react-odometerjs";

export default function OdometerLib({ value, duration = 2000, format = "(,ddd)" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Trigger the animation on mount or when `value` changes:
        setCount(value);
    }, [value]);

    return (
        <Odometer
            value={count}
            format={format}
            duration={duration}
            theme="default"
            // you can also pass `theme="car"` or `"default"`, etc.
        />
    );
}
