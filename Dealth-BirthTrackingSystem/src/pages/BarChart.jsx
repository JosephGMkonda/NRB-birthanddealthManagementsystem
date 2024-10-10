import React, { useRef, useEffect,useState } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const chartRef = useRef();
  const [data, setData] = useState(null)

  useEffect(() => {
    
    fetch('http://127.0.0.1:8000/api/birth-stats/')
    .then((response) => response.json())
    .then((apiData) => {
      console.log("Bar Chart data: ", apiData)
      const transFormData = Object.keys(apiData).flatMap(month => [
        {month, gender: 'Male', value:apiData[month].Male},
        {month, gender: 'Female', value:apiData[month].Female }
      ]);


      setData(transFormData);
  })
  .catch((error) => console.error('Error fetching data: ', error ));
     
    },[])

    useEffect(() => {
      if (!data) return;  // Do nothing until data is loaded
  
      // Set dimensions and margins
      const width = 500;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  
      // Remove any previous SVG elements
      d3.select(chartRef.current).selectAll("*").remove();
  
      // Create the SVG container
      const svg = d3.select(chartRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMidYMid meet') 
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
      // Create scales
      const x0 = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, width])
        .padding(0.2);
  
      const x1 = d3.scaleBand()
        .domain(['Male', 'Female'])
        .range([0, x0.bandwidth()])
        .padding(0.3);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([height, 0]);
  
      const color = d3.scaleOrdinal()
        .domain(['Male', 'Female'])
        .range(['blue', 'red']);
  
      // Add the x-axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x0));
  
      // Add the y-axis
      svg.append('g')
        .call(d3.axisLeft(y));
  
      // Add bars to the chart
      const barGroups = svg.selectAll('.bar-group')
        .data(data)
        .enter().append('g')
        .attr('transform', d => `translate(${x0(d.month)},0)`);
  
      barGroups.append('rect')
        .attr('x', d => x1(d.gender))
        .attr('y', d => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', d => color(d.gender));
  
    }, [data]);  // Re-run this effect when `data` changes
  
    

  return (
    <svg ref={chartRef}></svg>
  );
};

export default BarChart;
