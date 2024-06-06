import React from 'react';

const LineChart = ({ viewsPerDay, width, height, padding, title }) => {
    // Extract x and y coordinates from the data
    const xValues = viewsPerDay.map(point => point.x);
    const yValues = viewsPerDay.map(point => point.y);

    // Calculate maximum y value
    const maxY = Math.max(...yValues);

    // Calculate scales for x and y axes
    const xScale = (width - padding * 2) / (viewsPerDay.length - 1);
    const yScale = (height - padding * 2) / maxY;

    // Generate path for the line
    const path = viewsPerDay.map((point, index) => {
        const x = padding + index * xScale;
        const y = height - padding - point.y * yScale;
        return `${x},${y}`;
    }).join(' ');

    // Generate x-axis labels
    const xAxisLabels = viewsPerDay.map(point => point.x);

    // Generate y-axis labels
    const numYLabels = 5;
    const yInterval = Math.ceil(maxY / numYLabels);
    const yAxisLabels = [];
    for (let i = 0; i <= maxY; i += yInterval) {
        yAxisLabels.push(i);
    }

    return (
        <div className='bg-gray-800 rounded'>
            <div className='flex justify-between w-full px-3 py-2'>
                <h2 className='text-2xl font-bold text-white'>{title}</h2>
                <button onClick={() => console.log('Button clicked')} className='text-lg px-2 rounded-md bg-gray-600 text-white'>Click Me</button>
            </div>
            <svg width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill="transparent" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="white" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="white" />
                {xAxisLabels.map((label, index) => (
                    <text key={index} x={padding + index * xScale - 3} y={height - padding + 15} fontSize="10" textAnchor="middle" fill="white">
                        {label}
                    </text>
                ))}
                {yAxisLabels.map((label, index) => (
                    <text key={index} x={padding / 2} y={height - padding - label * yScale - 10} fontSize="10" textAnchor="end" dy="0.3em" fill="white">
                        {label}
                    </text>
                ))}
                <polyline points={path} fill="none" stroke="white" strokeWidth="2" />
            </svg>
        </div>
    );
};

export default LineChart;
