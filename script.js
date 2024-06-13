const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const getDataByID = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      const dataset = data.data
      const datesData = dataset.map((i)=>{return new Date(i[0])})
      
      console.log(datesData, (d)=>d)

      const width = 800;
      const height = 600;
      const padding = 60;

      const svgCanvas = d3.select('#main-container').append('svg').attr('width', width).attr('height', height).attr('class', 'svgCanvas').style('border-radius', '5px')
      
      const xScale = d3.scaleTime().domain([d3.min(datesData), d3.max(datesData)]).range([padding, width - padding])
      const yScale = d3.scaleLinear().domain([0, d3.max(dataset, (d) => d[1])]).range([height - padding, 0 + padding])

      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      

      svgCanvas.style('background-color', 'rgb(216, 219, 226)')
      svgCanvas.append('text').text('FCC Bar Chart').attr('x', width/2 - 100).attr('y', 40).attr('id', 'title').style('font-size', '2em').attr('fill', 'black')
      
      svgCanvas.selectAll('rect').data(dataset).enter().append('rect').attr('class', 'bar').attr('data-gdp',(d)=>d[1]).attr('data-date', (d)=>d[0])
      .attr('x', (_, i) => xScale(datesData[i]))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', width / 275)
      .attr('height', (d)=> d[1])

      svgCanvas.append('rect').attr('id', 'block').attr('fill', 'rgb(216, 219, 226)')
      .attr('width', width)
      .attr('height', 300)
      .attr('x', 0)
      .attr('y', 541)
      

      svgCanvas.append("g").attr("transform", "translate(0," + (height - padding) + ")").attr('id', 'x-axis').call(xAxis);
      svgCanvas.append("g").attr("transform", `translate(${padding})`).attr('id', 'y-axis').call(yAxis);
      let tooltip = d3.select('.svgCanvas').append('text').attr('id', 'tooltip').style('visibility', 'hidden').attr('x', width / 2 - 100).attr('y', height - padding + 50).attr('fill', 'black')
      

      svgCanvas.data(datesData).enter().selectAll('rect')
      .on('mouseover', (_, data) => {  
        tooltip.transition()
          .attr('fill', 'black')
          .attr('color', 'black')
          .style('visibility', 'visible')
        tooltip.text(`GDP: ${data[1]}\nDate: ${data[0]}`)
        tooltip.attr('data-date', data[0])
        
    })

    .on('mouseout', () => {
      tooltip.transition()
          .style('visibility', 'hidden')
    })        
   
    } catch(error) {
        console.log(error)
    }}

document.addEventListener('DOMContentLoaded', getDataByID)







    
console.log(d3)