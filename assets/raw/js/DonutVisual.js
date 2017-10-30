import Visual from './Visual';

class DonutVisual extends Visual {
  constructor(config) {
    super(config);
  }

  renderControls(id) {

  }

  render(render_id) {
    // Empty the container, then place the SVG in there
    document.getElementById(render_id).innerHTML = '';

    const width = this.attributes.width;
    const height = this.attributes.height;
    const radius = Math.min(width, height) / 2;

    const color = d3.scale.ordinal().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    const arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(100);

    const pie = d3.layout.pie()
      .sort(null)
      .value(d => d.value);

    const svg = d3.select(`#${render_id}`).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'donut')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const g = svg.selectAll('.arc')
      .data(pie(this.getGroupedListCounts('color')))
      .enter().append('g')
      .attr('class', 'arc ');

    g.append('path')
      .attr('d', arc)
      .style('fill', d => '#d0743c', // color(d.data.age);
      );

    g.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .attr('style', `font-size:${this.attributes.font_size}`)
      .text(d => d.data.key);
  }
}

new DonutVisual(
  {
    data: 'Lol!',
    attributes:
    {
      width: 960,
      height: 500,
      font_size: '1em',
      label_field: '',
      category_field: 'population',
      category_order: '',
      colors: [],
    },
  },
).render('visual');
