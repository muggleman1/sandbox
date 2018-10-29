import Data from './visuals/helpers/Data';

const visuals = [
  { name: 'Bubble Map Chart', image: 'http://datavizproject.com/wp-content/uploads/2016/06/DVP_1_100-87.png', link: 'Bubble-Map-Chart' },
  { name: 'Donut Chart', image: 'http://datavizproject.com/wp-content/uploads/2015/10/3-Donut-Chart-300x300.png', link: 'Donut-Chart' },
  { name: 'Bubble Chart', image: 'http://datavizproject.com/wp-content/uploads/2016/06/DVP_1_100-67.png', link: 'Bubble-Chart' },
];

async function prefetchData(route) {
  await Data.fetchData(route[0], () => {
    console.log(`The ${route[0]} data set was prefetched!`);
  });
}


function renderVisualsList(route) {
  prefetchData(route);

  const page = document.getElementById('page');
  page.classList.remove('container-fluid');
  page.classList.add('container');

  const visualBlocks = document.createElement('div');
  visualBlocks.className = 'grid';

  const gridRow = document.createElement('div');
  gridRow.className = 'row';

  const selectionHeader = document.createElement('h2');
  selectionHeader.innerHTML = 'Please select a visual:';
  visualBlocks.appendChild(selectionHeader);

  visualBlocks.appendChild(gridRow);

  for (let i = 0; i < visuals.length; i += 1) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    const block = document.createElement('div');
    block.className = 'block';

    const link = document.createElement('a');
    link.href = visuals[i].link;

    const name = document.createElement('div');
    name.className = 'name';
    name.innerHTML = visuals[i].name;
    const image = document.createElement('img');
    image.src = visuals[i].image;
    link.appendChild(image);
    link.appendChild(name);
    block.appendChild(link);
    col.appendChild(block);

    gridRow.appendChild(col);
  }
  page.appendChild(visualBlocks);
}

export default renderVisualsList;
