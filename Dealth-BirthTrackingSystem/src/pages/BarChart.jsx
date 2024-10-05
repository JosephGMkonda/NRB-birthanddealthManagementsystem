import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    // Sample data
    const data = [10, 20, 30, 40, 50];

    // Set dimensions and margins
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create a scale for the x-axis
    const x = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    // Create a scale for the y-axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    // Add bars to the chart
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d))
      .attr('fill', 'steelblue');

    // Add the x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

  }, []); // Empty dependency array means this runs once when the component mounts.

  return (
    <svg ref={chartRef}></svg>
  );
};

export default BarChart;
