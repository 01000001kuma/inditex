import React, {useState, useEffect} from 'react';

const Loading = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        const handleStartLoading = () => setIsLoading(true);
        const handleStopLoading = () => setIsLoading(false);

        window.addEventListener('beforeunload', handleStartLoading);
        window.addEventListener('unload', handleStopLoading);

        return() => {
            window.removeEventListener('beforeunload', handleStartLoading);
            window.removeEventListener('unload', handleStopLoading);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressPercentage(prevPercentage => prevPercentage + 1);
        }, 50);
        return() => clearInterval(interval);
    }, []);

    return (

        <div className="percentage">
            {
            Math.min(progressPercentage, 100)
        }</div>
    );
};

export default Loading;
