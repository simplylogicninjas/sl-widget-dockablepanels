export const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_: unknown, value: unknown) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
