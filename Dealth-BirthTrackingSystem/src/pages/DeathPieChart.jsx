import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const DeathPieChart = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  // Fetch API data when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/death-stats/')
      .then(response => response.json())
      .then(data => {
        // Process the data to get totals for each gender
        const processedData = processData(data);
        setData(processedData);  // Set the processed data to state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Process the API data into a format suitable for the pie chart
  const processData = (apiData) => {
    const totals = { Male: 0, Female: 0 };

    Object.keys(apiData).forEach(month => {
      totals.Male += apiData[month].Male;
      totals.Female += apiData[month].Female;
    });

    return [
      { gender: 'Male', value: totals.Male },
      { gender: 'Female', value: totals.Female },
    ];
  };

  useEffect(() => {
    if (data.length === 0) return;  // Wait until data is fetched

    // Set the dimensions and radius of the pie chart
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Clear previous chart content (if any)
    d3.select(chartRef.current).selectAll('*').remove();

    // Create a color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.gender))
      .range(d3.schemeCategory10);

    // Create the pie and arc generator
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc()
      .innerRadius(0)  // For a full pie chart
      .outerRadius(radius);

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);  // Center the pie chart

    // Bind data and create pie chart slices
    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.gender));

    // Add labels to the slices
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => `${d.data.gender}: ${d.data.value}`)
      .style('fill', 'white')
      .style('font-size', '12px');

  }, [data]);  // Re-run when data is updated

  return (
    <svg ref={chartRef}></svg>
  );
};

export default DeathPieChart;
