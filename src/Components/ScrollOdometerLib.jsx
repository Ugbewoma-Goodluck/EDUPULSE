import React, { useRef, useState, useEffect } from "react";
import OdometerLib from "./OdometerLib";

export default function ScrollOdometerLib({ value }) {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.5 },
        );
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref}>
            {/* Only update the odometer once visible */}
            {visible && <OdometerLib value={value} duration={1500} />}
        </div>
    );
}
