import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const DeathPieChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    // Sample data (can be replaced with dynamic data)
    const data = [10, 20, 30, 40];

    // Set the dimensions and radius of the pie chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Create a color scale
    const color = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeCategory10);

    // Create the pie and arc generator
    const pie = d3.pie().value(d => d);
    const arc = d3.arc()
      .innerRadius(0) // for a full pie chart
      .outerRadius(radius);

    // Clear previous chart content (if any)
    d3.select(chartRef.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`); // Center the pie chart

    // Bind data and create pie chart slices
    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data));

    // Add labels to the slices
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data)
      .style('fill', 'white')
      .style('font-size', '12px');

  }, []); // Empty dependency array means it only runs once when the component mounts.

  return (
    <svg ref={chartRef}></svg>
  );
};

export default DeathPieChart;
