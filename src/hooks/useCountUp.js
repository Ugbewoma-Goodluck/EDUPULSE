import { useState, useEffect } from "react";

export default function useCountUp(target, duration, startOn = true) {
    const [value, setValue] = useState(startOn ? 0 : null);

    useEffect(() => {
        if (!startOn) return;
        let startTime = null;

        function step(timestamp) {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }, [target, duration, startOn]);

    return value;
}
